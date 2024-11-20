from setuptools import setup, find_packages

setup(
    name='erpnext_machine_shop',
    version='1.0.0',
    description='Custom ERPNext app for machine shop management',
    author='CheapMachine',
    author_email='support@cheapmachine.com',
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    install_requires=['frappe'],
)
