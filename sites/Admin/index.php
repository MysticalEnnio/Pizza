<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="icon" href="assets/pictures/favicon.png">
    <meta property="og:type" content="website">
    <meta property="og:url" content="http://mystaredia.de/sites/chat">
    <meta property="og:title" content="MystiChat">
    <meta property="og:description" content="Chat for all Mystical People">
    <meta property="og:image" content="http://mystaredia.de/assets/pictures/Mystaredia.png">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Italianno">
    <link rel="stylesheet" href="./css/style.css?t=<?=time()?>">
    <link rel="stylesheet" href="../../libs/menu.css?t=<?=time()?>">
    <script src="../../libs/jquery-3.6.0.min.js"></script>
    <script src="../../libs/jquery.easie-min.js"></script>
    <script src="../../libs/socket.io.min.js"></script>
    <script src="./js/utils.js?t=<?=time()?>"></script>
    <script src="./js/page-handler.js?t=<?=time()?>"></script>
    <script src="./js/pages.js?t=<?=time()?>"></script>
    <title>Pizza</title>
</head>

<body>
    <input id="page-nav-toggle" class="main-navigation-toggle" type="checkbox" />
    <label for="page-nav-toggle">
        <svg class="icon--menu-toggle" viewBox="0 0 60 30">
            <g class="icon-group">
                <g class="icon--menu">
                    <path d="M 6 0 L 54 0" />
                    <path d="M 6 15 L 54 15" />
                    <path d="M 6 30 L 54 30" />
                </g>
                <g class="icon--close">
                    <path d="M 15 0 L 45 30" />
                    <path d="M 15 30 L 45 0" />
                </g>
            </g>
        </svg>
    </label>
    <nav class="main-navigation">
        <ul>
            <li><a href="../../" class="menu-option">Home</a></li>
            <li><a href="../../sites/Order" class="menu-option">Order</a></li>
            <li><a onclick="document.getElementById('page-nav-toggle').checked = false"
                    style="cursor: pointer" class="menu-option">Admin</a></li>
            <li><a href="../../sites/About/" class="menu-option">About</a></li>
        </ul>
    </nav>
    <div class="icon-back-div" style="display: none;">
        <svg class="icon-back" >
            <path stroke="#fff" stroke-linecap="round" d="M 5 15 L 20 25" />
            <path stroke="#fff" stroke-linecap="round" d="M 6 15 L 40 15" />
            <path stroke="#fff" stroke-linecap="round" d="M 5 15 L 20 5" />
        </svg>
    </div>
    <div id="content">
        <a id="Session">New Session</a>
        <br>
        <a id="Ingredients">Ingredients</a>
        <br>
        <a id="Options">Options</a>
    </div>
</body>
</html>