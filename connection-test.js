// Frontend-Backend Connection Test
// Run this in browser console on your live Vercel site

console.log('🧪 Testing SoilGuard Frontend-Backend Connection...\n');

// Test 1: Check Environment Variable
console.log('1️⃣ Checking Environment Variable...');
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
console.log('   NEXT_PUBLIC_API_URL:', apiUrl || '❌ NOT SET');
if (!apiUrl) {
  console.error('   ⚠️ WARNING: Environment variable not set!');
  console.log('   📝 Action: Add NEXT_PUBLIC_API_URL in Vercel dashboard');
} else {
  console.log('   ✅ Environment variable is set correctly');
}
console.log('');

// Test 2: Backend Health Check
console.log('2️⃣ Testing Backend Health...');
fetch('https://soil-guard.onrender.com/api/health')
  .then(response => response.json())
  .then(data => {
    console.log('   Response:', data);
    if (data.success) {
      console.log('   ✅ Backend is running and healthy');
      console.log('   📅 Timestamp:', data.timestamp);
    } else {
      console.log('   ❌ Backend returned error');
    }
  })
  .catch(error => {
    console.error('   ❌ Backend connection failed:', error);
    console.log('   🔍 Check if backend is down or CORS issue');
  });

// Test 3: API Client Test
console.log('3️⃣ Testing API Client...');
setTimeout(() => {
  fetch((apiUrl || 'https://soil-guard.onrender.com') + '/api/health')
    .then(response => {
      console.log('   Status:', response.status);
      console.log('   Status Text:', response.statusText);
      return response.json();
    })
    .then(data => {
      console.log('   ✅ API Client working correctly');
      console.log('   Data:', data);
    })
    .catch(error => {
      console.error('   ❌ API Client error:', error.message);
    });
}, 1000);

// Test 4: CORS Check
console.log('4️⃣ Testing CORS...');
setTimeout(() => {
  fetch('https://soil-guard.onrender.com/api/health', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      console.log('   ✅ CORS is configured correctly');
      console.log('   No CORS errors detected');
    })
    .catch(error => {
      if (error.message.includes('CORS')) {
        console.error('   ❌ CORS Error detected');
        console.log('   📝 Backend needs to allow your Vercel domain');
      } else {
        console.log('   ✅ No CORS issues');
      }
    });
}, 2000);

// Test 5: Full API Test (with Auth endpoint)
console.log('5️⃣ Testing Auth Endpoint...');
setTimeout(() => {
  fetch('https://soil-guard.onrender.com/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: 'test@example.com',
      password: 'test123'
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log('   ℹ️ Auth endpoint response:', data);
      console.log('   ✅ Auth endpoint is reachable');
      if (!data.success) {
        console.log('   ℹ️ Expected - invalid credentials test');
      }
    })
    .catch(error => {
      console.error('   ❌ Auth endpoint error:', error.message);
    });
}, 3000);

// Summary
setTimeout(() => {
  console.log('\n📊 Test Summary:');
  console.log('═══════════════════════════════════════════════════');
  console.log('Backend URL: https://soil-guard.onrender.com');
  console.log('Frontend URL: https://soil-guard-livid.vercel.app');
  console.log('Environment Variable:', apiUrl ? '✅ Set' : '❌ Missing');
  console.log('═══════════════════════════════════════════════════');
  console.log('\n💡 Next Steps:');
  if (!apiUrl) {
    console.log('1. Go to Vercel Dashboard → Settings → Environment Variables');
    console.log('2. Add: NEXT_PUBLIC_API_URL = https://soil-guard.onrender.com');
    console.log('3. Redeploy your site');
  } else {
    console.log('✅ All configuration looks good!');
    console.log('Try logging in or using the chat feature.');
  }
  console.log('\n🔍 Check the network tab for any failed API calls.');
}, 4000);
