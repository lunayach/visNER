![logo](https://user-images.githubusercontent.com/21227893/62409450-0363d500-b5f5-11e9-952b-ccb30015c823.png)

In the wild extraction of entities that are found using **Flair** and displayed using a very elegant front-end. 

### Screenshot

<img src="https://user-images.githubusercontent.com/21227893/62409449-fcd55d80-b5f4-11e9-81bf-bc5cc4450b40.png" width="600">

### Setting it up

#### Extractor (The backend)
- Change the directory to ``Extractor``.
- Open a terminal in the directory and do ``pip install -r requirements.txt``. (Recommended in a Python virtual environment).
- That's it, do ``python run.py ``. (By default, it opens the Flask server in the 8500. To run in other port, do ``python run.py --port <PORT_NUMBER>`` )

#### Angular Frontend
- Open the terminal in the main directory and do ``npm install``.
- Now do, ```ng serve``` in the terminal in the same directory.
- Navigate to `http://localhost:4200/`. visNER is now live there.

#### Credits
[Flair](https://github.com/zalandoresearch/flair)

#### Issues
The project is still in the very early stage. For any feature requests, errors, documentation requests or suggestions, please feel free 
to open the issues in the repository.

#### Contact
[Mail](mailto:mayankl@iitk.ac.in) [Twitter](https://twitter.com/mayank_lunayach)


