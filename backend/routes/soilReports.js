const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const SoilReport = require('../models/SoilReport');
const SoilTest = require('../models/SoilTest');
const notificationService = require('../services/notificationService');

// Helper function to calculate health score and grade
function calculateHealthMetrics(results) {
  let score = 0;
  let factors = 0;

  // pH score (optimal 6.0-7.0)
  if (results.pH) {
    factors++;
    if (results.pH >= 6.0 && results.pH <= 7.0) score += 25;
    else if (results.pH >= 5.5 && results.pH <= 7.5) score += 20;
    else if (results.pH >= 5.0 && results.pH <= 8.0) score += 15;
    else score += 5;
  }

  // NPK score
  const npkOptimal = { N: 280, P: 22, K: 280 }; // kg/ha
  ['nitrogen', 'phosphorus', 'potassium'].forEach(nutrient => {
    if (results[nutrient]) {
      factors++;
      const value = results[nutrient];
      const optimal = npkOptimal[nutrient.charAt(0).toUpperCase()];
      const percentage = (value / optimal) * 100;
      if (percentage >= 80 && percentage <= 120) score += 25;
      else if (percentage >= 60 && percentage <= 140) score += 20;
      else if (percentage >= 40 && percentage <= 160) score += 15;
      else score += 5;
    }
  });

  const avgScore = factors > 0 ? Math.round(score / factors) : 0;

  let grade = 'Poor';
  if (avgScore >= 90) grade = 'Excellent';
  else if (avgScore >= 75) grade = 'Good';
  else if (avgScore >= 60) grade = 'Fair';
  else if (avgScore >= 40) grade = 'Poor';
  else grade = 'Critical';

  return { score: avgScore, grade };
}

// Helper function to generate recommendations
function generateRecommendations(results) {
  const recommendations = {
    immediate: [],
    shortTerm: [],
    longTerm: [],
    cropSuggestions: [],
    fertilizers: [],
    amendments: []
  };

  // pH recommendations
  if (results.pH < 6.0) {
    recommendations.immediate.push('Soil is acidic. Apply agricultural lime to raise pH.');
    recommendations.amendments.push('Dolomitic limestone - 2-3 tons per acre');
  } else if (results.pH > 7.5) {
    recommendations.immediate.push('Soil is alkaline. Apply sulfur or organic matter.');
    recommendations.amendments.push('Elemental sulfur - 200-300 kg per acre');
  }

  // Nitrogen recommendations
  if (results.nitrogen < 200) {
    recommendations.immediate.push('Nitrogen deficiency detected. Apply nitrogen-rich fertilizers.');
    recommendations.fertilizers.push('Urea (46% N) - 100-150 kg per acre OR Organic Compost - 5 tons per acre');
  }

  // Phosphorus recommendations
  if (results.phosphorus < 15) {
    recommendations.shortTerm.push('Phosphorus levels are low. Apply phosphatic fertilizers.');
    recommendations.fertilizers.push('Single Super Phosphate (SSP) - 75-100 kg per acre');
  }

  // Potassium recommendations
  if (results.potassium < 200) {
    recommendations.shortTerm.push('Potassium deficiency. Apply potassic fertilizers.');
    recommendations.fertilizers.push('Muriate of Potash (MOP) - 50-75 kg per acre');
  }

  // Organic matter recommendations
  if (results.organicCarbon && results.organicCarbon < 0.5) {
    recommendations.longTerm.push('Low organic matter. Regular compost application needed.');
    recommendations.amendments.push('Farm Yard Manure (FYM) or Compost - 10 tons per acre annually');
  }

  // Crop suggestions based on soil type
  if (results.soilTexture) {
    if (results.soilTexture.includes('clay')) {
      recommendations.cropSuggestions.push('Rice, wheat, cotton, sugarcane');
    } else if (results.soilTexture.includes('loam')) {
      recommendations.cropSuggestions.push('Vegetables, fruits, wheat, maize, pulses');
    } else if (results.soilTexture.includes('sandy')) {
      recommendations.cropSuggestions.push('Groundnut, watermelon, millet, pulses');
    }
  }

  // General recommendations
  if (recommendations.immediate.length === 0) {
    recommendations.immediate.push('Soil health is good. Maintain regular monitoring.');
  }
  
  recommendations.longTerm.push('Implement crop rotation for sustained soil health');
  recommendations.longTerm.push('Practice mulching to retain moisture and improve soil structure');

  return recommendations;
}

// Helper to recommend products based on soil report
function recommendProducts(results, mockProducts = null) {
  const products = [];

  // Recommend based on deficiencies
  if (results.nitrogen < 200) {
    products.push({
      productName: 'Organic Compost',
      reason: 'Rich in nitrogen and improves soil structure',
      priority: 1,
      quantity: '5 bags (250kg total) per acre',
      estimatedCost: 2245,
      applicationMethod: 'Broadcast and incorporate into top 6 inches',
      expectedResults: 'Increases nitrogen by 30-40kg/ha, improves organic matter'
    });
  }

  if (results.pH < 6.0) {
    products.push({
      productName: 'Agricultural Lime',
      reason: 'Neutralizes soil acidity and balances pH',
      priority: 1,
      quantity: '2-3 tons per acre',
      estimatedCost: 15000,
      applicationMethod: 'Spread evenly, preferably 2-3 months before sowing',
      expectedResults: 'Raises pH by 0.5-1.0 units'
    });
  }

  if (results.organicCarbon && results.organicCarbon < 0.5) {
    products.push({
      productName: 'Premium Garden Soil',
      reason: 'Enriched with organic matter for overall soil health',
      priority: 2,
      quantity: '1-2 cubic yards per acre for amendments',
      estimatedCost: 2097,
      applicationMethod: 'Mix with existing soil in problem areas',
      expectedResults: 'Improves soil texture, water retention, and microbial activity'
    });
  }

  return products;
}

// @route   POST /api/soil-reports
// @desc    Generate soil report from test results
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { soilTestId } = req.body;

    // Find the soil test
    const soilTest = await SoilTest.findOne({
      _id: soilTestId,
      userId: req.user._id
    });

    if (!soilTest) {
      return res.status(404).json({
        success: false,
        message: 'Soil test not found'
      });
    }

    if (!soilTest.results || !soilTest.results.pH) {
      return res.status(400).json({
        success: false,
        message: 'Soil test results not available yet'
      });
    }

    // Calculate health metrics
    const { score, grade } = calculateHealthMetrics(soilTest.results);

    // Generate recommendations
    const recommendations = generateRecommendations(soilTest.results);

    // Recommend products
    const recommendedProducts = recommendProducts(soilTest.results);

    // Generate analysis details
    const analysis = {
      soilType: soilTest.results.soilTexture || 'Unknown',
      texture: soilTest.results.soilTexture || 'To be determined',
      pH: {
        value: soilTest.results.pH,
        status: soilTest.results.pH >= 6.0 && soilTest.results.pH <= 7.0 ? 'optimal' : 
                soilTest.results.pH < 6.0 ? 'low' : 'high',
        recommendation: soilTest.results.pH < 6.0 ? 'Apply lime to raise pH' :
                        soilTest.results.pH > 7.5 ? 'Apply sulfur or organic matter to lower pH' :
                        'Maintain current pH through balanced fertilization'
      },
      nutrients: {
        nitrogen: {
          value: soilTest.results.nitrogen,
          status: soilTest.results.nitrogen >= 200 ? 'optimal' : 'low',
          recommendation: soilTest.results.nitrogen < 200 ? 'Apply nitrogen-rich fertilizers or organic compost' : 'Maintain with balanced NPK fertilizers'
        },
        phosphorus: {
          value: soilTest.results.phosphorus,
          status: soilTest.results.phosphorus >= 15 ? 'optimal' : 'low',
          recommendation: soilTest.results.phosphorus < 15 ? 'Apply phosphatic fertilizers' : 'Maintain current levels'
        },
        potassium: {
          value: soilTest.results.potassium,
          status: soilTest.results.potassium >= 200 ? 'optimal' : 'low',
          recommendation: soilTest.results.potassium < 200 ? 'Apply potassic fertilizers' : 'Maintain current levels'
        }
      },
      organicMatter: {
        value: soilTest.results.organicMatter || (soilTest.results.organicCarbon * 1.724),
        status: (soilTest.results.organicCarbon || 0) >= 0.5 ? 'optimal' : 'low',
        recommendation: (soilTest.results.organicCarbon || 0) < 0.5 ? 'Add compost and organic matter regularly' : 'Maintain through crop residue management'
      }
    };

    // Create soil report
    const soilReport = await SoilReport.create({
      userId: req.user._id,
      soilTestId: soilTest._id,
      overallHealthScore: score,
      healthGrade: grade,
      analysis,
      recommendations,
      recommendedProducts,
      generatedBy: 'AI'
    });

    // Update soil test
    soilTest.reportGenerated = true;
    soilTest.reportId = soilReport._id;
    await soilTest.updateStatus('report_ready', 'Soil health report generated');

    // Send notification
    try {
      await notificationService.sendNotification(
        req.user,
        'reportReady',
        soilTest.testId,
        soilReport.reportNumber,
        grade
      );
      soilReport.notificationSent.sms = true;
      soilReport.notificationSent.whatsapp = true;
      soilReport.notificationSentAt = new Date();
      await soilReport.save();
    } catch (notifError) {
      console.error('Report notification error:', notifError);
    }

    res.status(201).json({
      success: true,
      message: 'Soil report generated successfully',
      soilReport
    });
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating soil report'
    });
  }
});

// @route   GET /api/soil-reports
// @desc    Get all soil reports for logged-in user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const reports = await SoilReport.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .populate('soilTestId');

    res.json({
      success: true,
      count: reports.length,
      reports
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching soil reports'
    });
  }
});

// @route   GET /api/soil-reports/:id
// @desc    Get a specific soil report
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const report = await SoilReport.findOne({
      _id: req.params.id,
      userId: req.user._id
    }).populate('soilTestId');

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    // Mark as viewed
    if (!report.viewed) {
      report.viewed = true;
      report.viewedAt = new Date();
      await report.save();
    }

    res.json({
      success: true,
      report
    });
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching soil report'
    });
  }
});

module.exports = router;
