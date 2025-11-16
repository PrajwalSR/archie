# 🧪 Testing Guide - Verify Archie is Working

## Pre-Flight Checklist

Before the demo, verify everything works:

### 1. Dependencies Installed ✓
```bash
cd /Users/prajwalshanthakumarirangaswamy/Downloads/My\ Projects/archie
npm install
```
Should show: "added 124 packages"

### 2. Environment Configured ✓
```bash
cat .env
```
Should show:
```
ANTHROPIC_API_KEY=sk-ant-...
PORT=3000
```

### 3. Server Starts ✓
```bash
npm start
```
Should show:
```
🤖 Archie is running on http://localhost:3000
📋 API Key configured: Yes
```

### 4. Health Check ✓
```bash
curl http://localhost:3000/api/health
```
Should return:
```json
{"status":"ok","message":"Archie is ready to architect!"}
```

## Test Cases

### Test Case 1: Healthcare (HIPAA Detection)

**Input:**
- Idea: "An app for doctors to share patient MRI scans with specialists for second opinions"
- Users: 100-1,000 (Small Launch)
- Compliance: Healthcare (HIPAA Required)
- Skill: Non-technical
- Timeline: 3-6 months

**Expected Output:**
- ✅ HIPAA compliance warning appears (red/yellow alert box)
- ✅ System diagram includes "Encrypted Database"
- ✅ Tech stack mentions AWS (or GCP with HIPAA support)
- ✅ First steps include "Set up HIPAA-compliant hosting"
- ✅ Risks mention "HIPAA violations can result in fines"

### Test Case 2: Payments (PCI Detection)

**Input:**
- Idea: "Peer-to-peer payment app for splitting bills between friends"
- Users: 1,000-10,000
- Compliance: Payments (PCI-DSS Required)
- Skill: Intermediate
- Timeline: 1-3 months

**Expected Output:**
- ✅ PCI-DSS compliance warning
- ✅ Recommendation to use Stripe/PayPal (not handle cards directly)
- ✅ "Never store credit card numbers" in risks
- ✅ Diagram shows external payment processor

### Test Case 3: Simple Student Project

**Input:**
- Idea: "Note-sharing app for college students in my CS class"
- Users: Under 100 (MVP)
- Compliance: None
- Skill: Intermediate
- Timeline: 1-2 weeks (Hackathon)

**Expected Output:**
- ✅ Lightweight stack (Firebase, Supabase, or similar)
- ✅ Low cost estimate ($0-50/month)
- ✅ Simple deployment (Vercel/Netlify)
- ✅ No compliance warnings
- ✅ Fast timeline-appropriate recommendations

### Test Case 4: High-Scale Startup

**Input:**
- Idea: "Social media platform for Gen Z focused on video content"
- Users: 100,000+ (High Scale)
- Compliance: General (GDPR/Standard)
- Skill: Advanced
- Timeline: 6+ months

**Expected Output:**
- ✅ CDN mentioned (CloudFront, Cloudflare)
- ✅ Database sharding/replication strategy
- ✅ Video transcoding service (Mux, AWS MediaConvert)
- ✅ Higher cost estimate ($1,000+/month)
- ✅ Microservices or scalable architecture

### Test Case 5: Edge Case - Vague Idea

**Input:**
- Idea: "An app for productivity"
- Users: 100-1,000
- Compliance: None
- Skill: Basic
- Timeline: 1-3 months

**Expected Output:**
- ✅ Still generates architecture (doesn't error)
- ✅ Makes reasonable assumptions
- ✅ Suggests clarifying the specific use case
- ✅ Generic but valid tech stack (Next.js, Firebase, etc.)

## Validation Checklist

After each test, verify:

- [ ] Loading spinner appears (10-20 seconds)
- [ ] No JavaScript errors in browser console (F12)
- [ ] Mermaid diagram renders correctly (not raw code)
- [ ] All sections populate with content
- [ ] "Start Over" button returns to form
- [ ] Form resets properly

## Error Testing

### Test Error Handling

**Test 1: Missing API Key**
1. Rename `.env` to `.env.backup`
2. Restart server
3. Try to generate architecture
4. **Expected**: Error message "Failed to generate architecture"

**Test 2: Invalid API Key**
1. Edit `.env` to `ANTHROPIC_API_KEY=invalid-key-123`
2. Restart server
3. Try to generate architecture
4. **Expected**: Error message about authentication

**Test 3: Empty Form**
1. Leave all fields blank
2. Click "Generate"
3. **Expected**: HTML5 validation prevents submission

**Test 4: Network Timeout**
1. Disconnect internet
2. Try to generate architecture
3. **Expected**: Error message "Failed to generate architecture"

## Performance Testing

### Response Time Benchmarks

**Typical Performance:**
- Form submission to loading: < 100ms
- Claude API call: 10-20 seconds
- Diagram rendering: < 1 second
- Total time: ~15-25 seconds

**If slower than 30 seconds:**
- Check internet connection
- Verify API key is valid
- Try a shorter idea description

## Browser Compatibility

Test in these browsers:

- [ ] Chrome/Edge (primary)
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Safari (iPhone)
- [ ] Mobile Chrome (Android)

**Mobile Responsive Checks:**
- [ ] Form is usable on mobile
- [ ] Diagram is scrollable
- [ ] Text is readable (not too small)
- [ ] Buttons are tappable

## Pre-Demo Final Check

**30 minutes before demo:**

```bash
# 1. Pull latest code (if using git)
git pull

# 2. Reinstall dependencies (just to be safe)
npm install

# 3. Verify environment
cat .env

# 4. Start server
npm start

# 5. Test one full flow (healthcare example)
# Open http://localhost:3000 in browser
# Submit healthcare example
# Verify diagram renders

# 6. Keep server running in terminal
# Don't close this terminal!
```

**5 minutes before demo:**

1. Open browser to http://localhost:3000
2. Have the healthcare example ready to paste
3. Close all other browser tabs (for clean demo)
4. Set browser zoom to 100%
5. Clear browser console (F12 → Clear)
6. Take a deep breath 😊

## Troubleshooting Quick Fixes

### "Diagram not rendering"
- Refresh page (Ctrl+R or Cmd+R)
- Check browser console for Mermaid errors
- Verify Mermaid CDN is loading (check Network tab)

### "Slow response time"
- Claude API can take 15-20 seconds (this is normal)
- If > 30 seconds, check internet connection
- Try a simpler/shorter idea description

### "JSON parsing error"
- Claude sometimes returns markdown wrapped JSON
- Our code handles this (see `server.js` line ~90)
- If persistent, check API key credits

### "Port already in use"
- Another app is using port 3000
- Change PORT in `.env` to 3001
- Or kill the other process: `lsof -ti:3000 | xargs kill`

## Success Criteria

**You're ready to demo if:**

✅ Server starts without errors
✅ Health check returns "ok"
✅ Healthcare example generates full architecture
✅ HIPAA warning displays correctly
✅ Diagram is visible and professional-looking
✅ "Start Over" button works
✅ No console errors

---

**If all checks pass, you're good to go!** 🚀

**Last Resort:** If something breaks during demo:
1. Stay calm
2. Show screenshots (prepare backups)
3. Explain what *would* happen
4. Focus on the value proposition, not the tech demo

Good luck! 🍀
