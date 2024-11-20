#!/usr/bin/env python
import os
from setuptools import setup, find_packages

# Setup for the machine shop ERPNext app
setup(
    name='erpnext_machine_shop',
    version='7.0.0',
    description='A custom ERPNext app for managing machine shop processes with aerospace and medical traceability.',
    author='Machine Shop Inc.',
    author_email='info@machineshop.com',
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'erpnext',
    ],
)

# ERPNext App Setup
# Define fixtures to create DocTypes, reports, and custom scripts
fixtures = [
    {
        "doctype": "Custom Field",
        "filters": [["name", "in", [
            "Job Card-job_status",
            "Job Card-machine_code",
            "Work Order-machining_notes",
            "Work Order-finished_part",
            "Work Order-uploaded_documents",
            "Work Order-part_print",
            "Work Order-material_certificates",
            "Work Order-finish_certificates",
            "Work Order-passivation_certificates",
            "Job Card-traceability_requirements",
            "Work Order-inspection_report",
            "Work Order-job_number",
            "Work Order-barcode",
            "Work Order-current_employee",
            "Work Order-current_status",
            "Work Order-quote_number",
            "Work Order-estimated_cost",
            "Work Order-actual_cost",
            "Work Order-scheduled_start_time",
            "Work Order-scheduled_end_time",
            "Work Order-tooling_requirements",
            "Work Order-non_conformance_report"
        ]]]
    },
    {
        "doctype": "Property Setter",
        "filters": [["doc_type", "in", [
            "Work Order", "Job Card", "Part", "Customer"
        ]]]
    },
    {
        "doctype": "Client Script",
        "filters": [["dt", "in", [
            "Work Order", "Job Card", "Part", "Customer"
        ]]]
    },
]

# Hooks for the app setup in ERPNext
app_name = "erpnext_machine_shop"
app_version = "7.0.0"
app_title = "ERPNext Machine Shop"
app_publisher = "Machine Shop Inc."
app_description = "Machine Shop Application for ERPNext to handle work orders, job tracking, inventory, machine assignments, aerospace and medical traceability, document uploads, inspection reports, job numbers, barcode scanning, employee tracking, and compliance features."
app_icon = "octicon octicon-tools"
app_color = "blue"
app_email = "support@machineshop.com"
app_license = "MIT"

# Include customizations for DocTypes
doctype_js = {
    "Work Order": "public/js/work_order.js",
    "Job Card": "public/js/job_card.js",
    "Part": "public/js/part.js",
    "Customer": "public/js/customer.js"
}

# Dashboard UI setup
# JavaScript for creating a dashboard with customizable icons
custom_dashboard_js = """
frappe.pages['machine-shop-dashboard'].on_page_load = function(wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Machine Shop Dashboard',
        single_column: true
    });

    let sections = [
        { label: 'Quote Processing', icon: 'fas fa-file-invoice-dollar', doctype: 'Quotation' },
        { label: 'Order Processing', icon: 'fas fa-box-open', doctype: 'Sales Order' },
        { label: 'Work Orders', icon: 'fas fa-cogs', doctype: 'Work Order' },
        { label: 'Inventory Control', icon: 'fas fa-warehouse', doctype: 'Item' },
        { label: 'Shipping', icon: 'fas fa-shipping-fast', doctype: 'Delivery Note' },
        { label: 'Cost Analysis', icon: 'fas fa-chart-line', doctype: 'Cost Analysis' },
        { label: 'Tool Management', icon: 'fas fa-tools', doctype: 'Tool' },
        { label: 'Employee Tracking', icon: 'fas fa-user-clock', doctype: 'Employee' }
    ];

    sections.forEach(section => {
        page.add_icon_button(section.label, function() {
            frappe.set_route('List', section.doctype);
        }, section.icon);
    });

    // Add button to allow users to modify icons
    page.add_action_icon('fas fa-edit', function() {
        frappe.prompt({
            label: 'Customize Dashboard',
            fieldname: 'section',
            fieldtype: 'Table',
            options: [
                { label: 'Label', fieldname: 'label', fieldtype: 'Data' },
                { label: 'Icon', fieldname: 'icon', fieldtype: 'Data' },
                { label: 'Doctype', fieldname: 'doctype', fieldtype: 'Link', options: 'DocType' }
            ]
        }, function(values) {
            // Logic to update dashboard icons dynamically based on user input
            sections = values;
            // Re-render the dashboard UI with new sections
            frappe.pages['machine-shop-dashboard'].refresh();
        }, 'Edit Dashboard Icons');
    });
};
"""

# Define custom scripts for automation in the machine shop processes
work_order_js = """
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
"""

# Define custom scripts for job card validation
job_card_js = """
erpnext.ui.form.on('Job Card', {
    on_submit: function(frm) {
        if (!frm.doc.finished_part) {
            frappe.throw(__('Finished Part needs to be marked complete.'));
        }
        if (!frm.doc.traceability_requirements) {
            frappe.throw(__('Traceability requirements must be fulfilled for aerospace and medical jobs.'));
        }
    }
});
"""

# Define custom scripts for part management
part_js = """
erpnext.ui.form.on('Part', {
    validate: function(frm) {
        if (!frm.doc.part_print) {
            frappe.throw(__('Please upload the part print before saving.'));
        }
    }
});
"""

# Define custom scripts for customer management
customer_js = """
erpnext.ui.form.on('Customer', {
    validate: function(frm) {
        if (!frm.doc.customer_name) {
            frappe.throw(__('Please provide a customer name.'));
        }
    }
});
"""

# Include Python code for server-side automation
@frappe.whitelist()
def create_work_order_entry(work_order_name, machine_code, quantity, uploaded_documents, part_print, material_certificates, finish_certificates, passivation_certificates, current_employee, current_status, quote_number, estimated_cost, actual_cost, scheduled_start_time, scheduled_end_time, tooling_requirements, non_conformance_report):
    try:
        work_order_doc = frappe.get_doc("Work Order", work_order_name)
        work_order_doc.machine_code = machine_code
        work_order_doc.quantity = quantity
        work_order_doc.uploaded_documents = uploaded_documents
        work_order_doc.part_print = part_print
        work_order_doc.material_certificates = material_certificates
        work_order_doc.finish_certificates = finish_certificates
        work_order_doc.passivation_certificates = passivation_certificates
        work_order_doc.current_employee = current_employee
        work_order_doc.current_status = current_status
        work_order_doc.quote_number = quote_number
        work_order_doc.estimated_cost = estimated_cost
        work_order_doc.actual_cost = actual_cost
        work_order_doc.scheduled_start_time = scheduled_start_time
        work_order_doc.scheduled_end_time = scheduled_end_time
        work_order_doc.tooling_requirements = tooling_requirements
        work_order_doc.non_conformance_report = non_conformance_report
        if not work_order_doc.job_number:
            work_order_doc.job_number = 'JOB-' + frappe.utils.nowdate().replace('-', '') + '-' + work_order_name
        work_order_doc.save()
        frappe.db.commit()
    except frappe.DoesNotExistError:
        frappe.throw(__("Work Order {0} does not exist".format(work_order_name)))

@frappe.whitelist()
def generate_coc(work_order_name):
    # Code to generate Certificate of Conformance (CoC) for a Work Order
    work_order = frappe.get_doc("Work Order", work_order_name)
    # Logic to gather required information and generate CoC
    pass

@frappe.whitelist()
def generate_labels_and_packing_slips(work_order_name):
    # Code to generate labels and packing slips for a Work Order
    work_order = frappe.get_doc("Work Order", work_order_name)
    # Logic to gather required information and generate labels and packing slips
    pass

@frappe.whitelist()
def create_inspection_report(work_order_name, inspection_data):
    # Code to create an inspection report for a Work Order
    work_order = frappe.get_doc("Work Order", work_order_name)
    inspection_report = frappe.new_doc("Inspection Report")
    inspection_report.work_order = work_order_name
    inspection_report.inspection_data = inspection_data
    inspection_report.insert()
    work_order.inspection_report = inspection_report.name
    work_order.save()
    frappe.db.commit()

@frappe.whitelist()
def generate_barcode(job_number):
    # Code to generate a barcode for the given job number
    # Here, you would integrate with a barcode generation library or API
    barcode_url = f"https://barcode.example.com/generate?data={job_number}"
    return barcode_url

@frappe.whitelist()
def update_work_order_status(work_order_name, status, employee):
    # Code to update the current status and employee working on a Work Order
    work_order_doc = frappe.get_doc("Work Order", work_order_name)
    work_order_doc.current_status = status
    work_order_doc.current_employee = employee
    work_order_doc.save()
    frappe.db.commit()

@frappe.whitelist()
def manually_set_barcode(work_order_name, barcode_value):
    # Code to manually set a barcode value for a Work Order
    work_order_doc = frappe.get_doc("Work Order", work_order_name)
    work_order_doc.barcode = barcode_value
    work_order_doc.save()
    frappe.db.commit()

# Entry points for installation of the app
def install_app():
    os.system("bench get-app --branch version-13 erpnext_machine_shop")
    os.system("bench install-app erpnext_machine_shop")

if __name__ == "__main__":
    install_app()
