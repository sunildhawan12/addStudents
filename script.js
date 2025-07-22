const submittedIds = []; // ✅ पहले से सबमिट किए गए IDs को स्टोर करने वाला ऐरे

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

  // 🔴 पहले से सबमिट किया हुआ ID चेक करें
  if (submittedIds.includes(id)) {
    msg.innerHTML = `❗ <span style="color: red; font-weight: bold;">Sorry!</span> <span style="color: #0984e3; font-weight: bold;">${name}</span> आपको पहले से जोड़ा जा चुका है ❗`;
    return;
  }

  msg.innerHTML = `⏳ <span style="color: #555;">कृपया प्रतीक्षा करें...</span>`;

  const formData = new URLSearchParams();
  formData.append("id", id);
  formData.append("name", name);
  formData.append("phone", phone);

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbx69G1QrbRNS3bUnEfVFWqILNet_z7ouflafhded8ggAt3d_iI2N_IOWGb5Z387KZPw/exec", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      msg.innerHTML = `👋 <span style="color: green; font-weight: bold;">Hello!</span> <span style="color: #0984e3; font-weight: bold;">${name}</span> 👉 " आपको सफलतापूर्वक जोड़ा गया है। कृपया 1-2 घंटे बाद अपनी  ID से लॉगिन करें।" ✅!`;
      submittedIds.push(id); // ✅ Add to local ID store
      document.getElementById("id").value = "";
      document.getElementById("name").value = "";
      document.getElementById("phone").value = "";
    } else {
      msg.innerHTML = `<span style="color: red;">❌ डेटा भेजने में त्रुटि हुई।</span>`;
    }
  } catch (error) {
    msg.innerHTML = `<span style="color: red;">❌ नेटवर्क त्रुटि! कृपया पुनः प्रयास करें।</span>`;
  }
}
