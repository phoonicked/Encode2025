import setuptools

setuptools.setup(
    name="agent_runner",
    py_modules=['agent_runner'],
    entry_points={
        'console_scripts': [
            'encode-test=agent_runner.__main__:main',  # This will run the 'main' function from 'your_module.py'
        ],
    },
)