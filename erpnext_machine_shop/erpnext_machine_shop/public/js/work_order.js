erpnext.ui.form.on('Work Order', {
    validate: function(frm) {
        if (frm.doc.machine_code && !frm.doc.job_status) {
            frappe.throw(__('Please enter Job Status before submission'));
        }
    },
    onload: function(frm) {
        frm.set_query("uploaded_documents", function() {
            return {
                filters: {
                    "attached_to_doctype": "Work Order",
                    "attached_to_name": frm.doc.name
                }
            };
        });
        frm.set_query("part_print", function() {
            return {
                filters: {
                    "attached_to_doctype": "Part",
                    "attached_to_name": frm.doc.part
                }
            };
        });
        if (!frm.doc.job_number) {
            frm.set_value('job_number', 'JOB-' + frappe.utils.nowdate().replace(/-/g, '') + '-' + frm.doc.name);
        }
    },
    refresh: function(frm) {
        if (frm.doc.part_print) {
            frm.add_custom_button(__('View Print'), function() {
                window.open(frm.doc.part_print);
            }, __('View'));
        }
        if (frm.doc.job_number) {
            frm.add_custom_button(__('Print Barcode'), function() {
                frappe.call({
                    method: 'erpnext_machine_shop.utils.generate_barcode',
                    args: {
                        job_number: frm.doc.job_number
                    },
                    callback: function(response) {
                        var barcode_url = response.message;
                        if (barcode_url) {
                            window.open(barcode_url);
                        }
                    }
                });
            }, __('Barcode'));
        }
        if (frm.doc.customer == null) {
            frm.add_custom_button(__('Create Customer'), function() {
                frappe.new_doc('Customer');
            }, __('Quick Actions'));
        }
        if (frm.doc.part == null) {
            frm.add_custom_button(__('Create Part'), function() {
                frappe.new_doc('Part');
            }, __('Quick Actions'));
        }
    }
});
