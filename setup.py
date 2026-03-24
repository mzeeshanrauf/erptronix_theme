from setuptools import setup, find_packages

with open("requirements.txt") as f:
    install_requires = f.read().strip().split("\n")

setup(
    name="erptronix_theme",
    version="1.0.0",
    description="ErpTronix — Custom dark navy + electric cyan brand theme for ERPNext v16",
    author="ErpTronix",
    author_email="hello@erptronix.com",
    packages=find_packages(),
    zip_safe=False,
    include_package_data=True,
    install_requires=install_requires,
    python_requires=">=3.10",
)
