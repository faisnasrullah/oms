# Copyright (c) 2023, Fais Nasrullah and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

# from frappe.utils.file_manager import save_file


class Product(Document):
    pass
    # def before_save(self):
    #     if self.attachment:
    #         # Modify the file name as needed
    #         new_filename = "DJA_NCOK-" + self.attachment
    #         # Save the modified file
    #         save_file(self.attachment, content=self.get_file(), filename=new_filename)
    #         # Update the attachment field with the new file name
    #         self.attachment = new_filename
