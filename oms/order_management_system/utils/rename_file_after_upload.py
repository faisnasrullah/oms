from frappe import rename_doc


def rename_file_after_upload(doc, method):
    new_filename = "DJA_NCOK-"
    print("\n\n\n")
    print("KE HIT INI LAH PASTI")
    print("\n\n\n")
    # Check if the file is attached to a DocType
    if doc.attached_to_doctype:
        new_file_name = new_filename + doc.file_name[doc.file_name.rfind(".") :]
        rename_doc("File", doc.name, new_file_name, ignore_permissions=True)
