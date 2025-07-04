const submittedIds = []; // ✅ पहले से सबमिट किए गए IDs को स्टोर करने वाला ऐरे

async function submitStudent() {
  const id = document.getElementById("id").value.trim();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const msg = document.getElementById("msg");

  // 🔴 Validation
  if (!id || !name || !phone) {
    msg.textContent = "❗ कृपया सभी फ़ील्ड भरें।";
    msg.style.color = "red";
    return;
  }

  // 🔴 पहले से सबमिट किया हुआ ID चेक करें
  if (submittedIds.includes(id)) {
    msg.textContent = "⚠️ यह छात्र पहले ही जोड़ा जा चुका है!";
    msg.style.color = "orange";
    return;
  }

  msg.textContent = "⏳ कृपया प्रतीक्षा करें...";
  msg.style.color = "#555";

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
      msg.textContent = `✅ छात्र ${name} को सफलतापूर्वक जोड़ा गया!`;
      msg.style.color = "green";
      submittedIds.push(id); // ✅ Add to already submitted list
      document.getElementById("id").value = "";
      document.getElementById("name").value = "";
      document.getElementById("phone").value = "";
    } else {
      msg.textContent = "❌ डेटा भेजने में त्रुटि हुई।";
      msg.style.color = "red";
    }
  } catch (error) {
    msg.textContent = "❌ नेटवर्क त्रुटि! कृपया पुनः प्रयास करें।";
    msg.style.color = "red";
  }
}
