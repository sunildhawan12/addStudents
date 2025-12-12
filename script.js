  // ✅ Google Sheet से पहले से सबमिट किए गए IDs को स्टोर करने वाला ग्लोबल ऐरे।
        let submittedIds = []; 
        // Admin Panel का URL, जिसका उपयोग IDs को लोड करने के लिए किया जाता है।
        const EXISTING_IDS_FETCH_URL = "https://script.google.com/macros/s/AKfycbz-3AhxhrO7q-vI4Mr2ELmryKemFSCCUXMcbXnXd1_QXYb-HyK8XPKmmPI5OOfQfa-Z/exec";
        // स्टूडेंट डेटा सबमिट करने का URL
        const SUBMIT_STUDENT_URL = "https://script.google.com/macros/s/AKfycbx69G1QrbRNS3bUnEfVFWqILNet_z7ouflafhded8ggAt3d_iI2N_IOWGb5Z387KZPw/exec";

        // 1. 📊 पेज लोड पर मौजूदा IDs को लोड करने का फ़ंक्शन
        async function loadExistingIds() {
            const msg = document.getElementById("msg");
            
            // अगर IDs पहले से लोड हैं या फेचिंग चल रही है तो न करें
            if (submittedIds.length > 0) return; 

            msg.innerHTML = `⏳ <span style="color: #555;">पुराने IDs लोड किए जा रहे हैं...</span>`;

            try {
                const res = await fetch(EXISTING_IDS_FETCH_URL);
                const data = await res.json();
                
                // सभी IDs को निकालकर submittedIds ऐरे में स्टोर करें
                submittedIds = data.map(row => row.id.toString().trim()).filter(id => id); 
                
                msg.textContent = ''; // मैसेज साफ़ करें
                console.log(`Successfully loaded ${submittedIds.length} existing IDs.`);
                
            } catch (error) {
                // फेल होने पर भी फॉर्म चालू रखने के लिए मैसेज साफ़ करें, लेकिन चेतावनी दें
                msg.innerHTML = `<span style="color: orange; font-weight: bold;">⚠️ ID जाँच अस्थायी रूप से निष्क्रिय है।</span>`;
                console.error("Error loading existing IDs:", error);
            }
        }


        // 2. 📤 नया छात्र डेटा सबमिट करने का फ़ंक्शन
        async function submitStudent() {
            const id = document.getElementById("id").value.trim();
            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const msg = document.getElementById("msg");

            // 🔴 Validation
            if (!id || !name || !phone) {
                msg.innerHTML = `<span style="color: red; font-weight: bold;">❗ कृपया सभी फ़ील्ड भरें।</span>`;
                return;
            }

            // 🔴 स्थायी ID चेक
            if (submittedIds.includes(id)) {
                msg.innerHTML = `❗ <span style="color: red; font-weight: bold;">Sorry!</span> <span style="color: #0984e3; font-weight: bold;">${name}</span> यह ID (${id}) पहले से मौजूद है। कृपया कोई और ID चुनें। ❗`;
                return;
            }

            msg.innerHTML = `⏳ <span style="color: #555;">कृपया प्रतीक्षा करें...</span>`;

            const formData = new URLSearchParams();
            formData.append("id", id);
            formData.append("name", name);
            formData.append("phone", phone);

            try {
                const response = await fetch(SUBMIT_STUDENT_URL, {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    msg.innerHTML = `👋 <span style="color: green; font-weight: bold;">Hello!</span> <span style="color: #0984e3; font-weight: bold;">${name}</span> 👉 " आपको सफलतापूर्वक जोड़ा गया है। कृपया 1-2 घंटे बाद अपनी  ID से लॉगिन करें।" ✅!`;
                    
                    // ✅ Add the newly submitted ID to the local store for instant check
                    submittedIds.push(id); 
                    
                    // Clear inputs
                    document.getElementById("id").value = "";
                    document.getElementById("name").value = "";
                    document.getElementById("phone").value = "";
                } else {
                    msg.innerHTML = `<span style="color: red;">❌ डेटा भेजने में त्रुटि हुई।</span>`;
                }
            } catch (error) {
                msg.innerHTML = `<span style="color: red;">❌ नेटवर्क त्रुटि! कृपया पुनः प्रयास करें।</span>`;
                console.error("Submission error:", error);
            }
        }

        // 3. 🚀 पेज लोड पर IDs को लोड करना शुरू करें और AOS को initialize करें
        window.onload = function() {
            AOS.init({ duration: 500, once: true });
            loadExistingIds(); 
        };

