// Copyright (c) 2023, Fais Nasrullah and contributors
// For license information, please see license.txt

frappe.ui.form.on("Product", {
  // refresh: function(frm) {
  // }
  //   tes_upload: function (frm) {
  //     // Get the uploaded file
  //     var file = frm.doc.tes_upload;
  //     console.log("FILE : ", file);
  //     if (file) {
  //       // Generate a new filename
  //       var newFileName = generateNewFileName(file.file_name);
  //       // Rename the file
  //       file.file_name = newFileName;
  //       file.file_url = "/files/" + newFileName;
  //       // Refresh the attachment field to update the display
  //       frm.refresh_field("tes_upload");
  //       console.log("AFTER UPLOAD");
  //     }
  //   },
});

// function generateNewFileName(fileName) {
//   // Implement your own logic to generate a new filename
//   // This can include adding a timestamp, user ID, or other unique identifiers
//   // Return the new filename
//   return "DJA_NCOK-" + fileName.substr(fileName.lastIndexOf("."));
// }
