from setuptools import setup, find_packages

setup(
    name="erptronix_theme",
    version="1.0.0",
    description="ErpTronix Theme for ERPNext v16",
    author="ErpTronix",
    author_email="hello@erptronix.com",
    packages=find_packages(),
    zip_safe=False,
    include_package_data=True,
    install_requires=["frappe"],
    python_requires=">=3.10",
)
