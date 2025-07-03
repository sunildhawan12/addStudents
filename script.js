 async function submitStudent() {
      const id = document.getElementById("id").value.trim();
      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const msg = document.getElementById("msg");

      if (!id || !name || !phone) {
        msg.textContent = "❗ Please fill all fields.";
        msg.style.color = "red";
        return;
      }

      msg.textContent = "⏳ Please wait...";

      const formData = new URLSearchParams();
      formData.append("id", id);
      formData.append("name", name);
      formData.append("phone", phone);

      const response = await fetch("https://script.google.com/macros/s/AKfycbx69G1QrbRNS3bUnEfVFWqILNet_z7ouflafhded8ggAt3d_iI2N_IOWGb5Z387KZPw/exec", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        msg.textContent = `✅ Student ${name} added successfully!`;
        msg.style.color = "green";
        document.getElementById("id").value = "";
        document.getElementById("name").value = "";
        document.getElementById("phone").value = "";
      } else {
        msg.textContent = "❌ Failed to submit.";
        msg.style.color = "red";
      }
    }

    function goBack() {
      window.location.href = "https://sunildhawan12.github.io/Adimn-p/"; // ✅ Replace with your admin panel filename
    }