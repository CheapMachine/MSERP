import frappe

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

# Additional utility functions go here...
