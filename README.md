Here I try to create various visualizations in D3.js.

TODO:
- refacor code to make more sense
- add transitions for plot elements / fix enter-update-exit
- add dropdown menu to select publisher
- add legend to pick which publishers to display together
- add hover tool and highlight (data points and their text)
- name all transitions to prevent conflicts

- add plot for overall revenue per publisher
  - with dropdown for year and total
  - sorted descending for each year


Notes on running local server:

To run a server from VS Code (Live Server extension):
- right-click inside html file and select 'Open with Live Server'
- to start/stop server: alt+O/alt+C
  
  
To run a server for D3.js (v3) from Node.js:
- open PowerShell
- navigate to the folder with your html page
- run: http-server
- open browser and go to: address of the server, e.g. http://127.0.0.1:8080

To run a server for D3.js (v5) via Python3.x:
- open PowerShell
- navigate to the folder with your html page
- run: python -m http.server 8888
- open browser and go to: address of the server:
    http://localhost:8888


Data source:
- https://www.kaggle.com/ashaheedq/video-games-sales-2019/data