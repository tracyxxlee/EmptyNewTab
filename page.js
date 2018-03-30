// all shortcuts show on the new tab
let shortcuts = null;
// item id for delete
let deleteID = null;
// new item
let item = {title: "",   url: "", icon: ""};

function saveShorts(items){
  // save the setting to access on other computer
  chrome.storage.sync.set({"shortcuts": items});
  shortcuts = items;
}

/* create shortcuts */
function dumpShortcuts(items){
  saveShorts(items);

  if(!!items){
    $('.item_list').empty();
    items.forEach(function(item){
        $('.item_list').append(dumpNode(item));
    });

    // open the link in the current tab
    $("a").click(function(){        
      window.location.href = this.getAttribute("href");
    });
    // show customized contextmenu
    $("li").bind("contextmenu",function(e){
        e.preventDefault();
        e.stopPropagation();
        $("#contextmenu").css("left",e.pageX);
        $("#contextmenu").css("top",e.pageY);
        $("#contextmenu").removeClass("hidden"); 
        $("#contextmenu").fadeIn(200);
    
        deleteID = e.currentTarget.id;
    });
        
    // click item in contextmenu
    $("#contextmenu > li").click(function(){    
        $("#contextmenu").addClass("hidden");
    
        // find the match item in list
        var item = shortcuts.find(function(item, index, array){
          return item.id === deleteID;
        });
        if(!!item){
          var index = shortcuts.indexOf(item);
          if(index > -1){
            // delete item from list
            shortcuts.splice(index, 1);
            // unbind the event
            $("li").unbind();
            $("#contextmenu > li").unbind();
            // re-create the list on the screen
            dumpShortcuts(shortcuts);
          }
        }
    });
  }
}

/* create HTML element for each shortcut */
function dumpNode(node){
   let root = $('<li class="item_icon">');
   root.attr('id', node.id);
   root.attr('title', node.url);

   let link = $('<a>');
   link.attr('href', node.url);
   
   let img = $('<img>');
   img.attr('src', node.icon);
   link.append(img);

   let div = $('<div></div>');
   div.append(link);
   root.append(div);
   
   let title = $('<div class="item_title">');
   var titleText = chrome.i18n.getMessage(node.title);
   title.text(!!titleText ? titleText : node.title);
   div.append(title);
   return root;
}

/* get the setting */
chrome.storage.sync.get(["shortcuts"], function(data) {
  // default shortcuts show on the new tab
  let defaultList = [
    {id: "1", title: "YouTube",  url: "https://www.youtube.com/?gl=TW", icon: "https://lh3.googleusercontent.com/I95wjYii8vhFSSx-aSYdh2hPAMjgZkA9yjarSQoOd98COwOxkAVn_dulBcTcfbsa7Limy6IKX6G95ep6OB6y2yMLMiX0YEqFx3KQHQ=h120"},
    {id: "2", title: "Inbox",    url: "https://inbox.google.com", icon: "https://lh3.googleusercontent.com/UXhkrrFp4MRBt-cDQQS8dBa6zkZ1OSjTESy-vObB7DfTzXmLtllD4hVD0Y8AH1VJN_wBh2KXU7SY5Q5zh0gcq4wVfWSSS825SvedWA=h120"},
    {id: "3", title: "Map",      url: "https://maps.google.com", icon: "https://lh3.googleusercontent.com/h2xmmkP-_RPM8kimxiZ0brUD_O16N5YsSrJA8srYewnR4Ay0fSevp51AKpIItoQY9ndhdGZFoi-wyAXNxE5mI_xQRVMdJtbAmStE1g=h120"},
    {id: "4", title: "Play",     url: "https://play.google.com", icon: "https://lh3.googleusercontent.com/vWJNEFxN3WY5PYAYjwZ9ycEXMCCiB8EbcFXZxfSv5xkKLw67C2J5qXJTBL9KSPldWmLpVMnucrsDBmPlrf9tMiEJpYNZNcTw_ymlxgc=h120"},   
    {id: "6", title: "Drive",    url: "https://drive.google.com/?authuser=0", icon: "https://lh3.googleusercontent.com/A-jk5o_CT_ucUdRRwmchoeMx1qoKolfGKFptEBHANKZELMmeJALE7m4KOZdDu0NjFNiekH0j2T981f5N_nZ_IU1HsRehKLPRQAX0=h120"},   
    {id: "7", title: "Keep",     url: "https://keep.google.com/u/0", icon: "https://lh3.googleusercontent.com/BG7WQTW1miMA7lsBFNyWnnIlm0SBceVj5-NCYQmtU3Zmys-n7xPva5fs9loQuA75f12ZiS6C7Yh9G_X1ISsFLKplLYPz09MKbUmjew=h120"},   
    {id: "8", title: "Blogger",  url: "https://www.blogger.com/", icon: "https://lh3.googleusercontent.com/JtYUq9HfkkOryxudgp34oqI8qFu9a6mmL64OXjcDX7mfEwcX_pxmTdurvxssofY4swTY2c_M1Kk5o1a863CGTiBZkxxuYXfjiNgz=h120"}
  ];
  dumpShortcuts(!!data.shortcuts ? data.shortcuts : defaultList);
});

/* hide the contextmenu when clicking on non-shortcut area */
$(document).click(function(e){
  e.preventDefault();
  $("#contextmenu").addClass("hidden"); 
});

/* show the default contextmenu when clicking on non-shortcut area */
$(document).bind("contextmenu", function(e){
  $("#contextmenu").addClass("hidden"); 
});

$(".setting").click(function(){
  $(".setting-content").toggleClass("hidden");

  if(!$(".setting-content").hasClass("hidden")){
      clearInvalids();
      clearSetting();
  }
});

// reset the input component
function clearSetting(){
    $("#title").val('');
    $("#url").val('');
    $("#input").val('');

    item = {};
}

function clearInvalids(){
    $(".invalid").removeClass("invalid");
}

$(".options #setting-save").click(function () {
  clearInvalids();

  if ($("#title").val().trim().length === 0) $("#title").addClass("invalid");
  if ($("#url").val().trim().length === 0) $("#url").addClass("invalid");

  if ($(".invalid").length === 0) {
    var maxId = -1;
    shortcuts.forEach(function(item){
      if(maxId < item.id)
        maxId = +item.id;
    });
    item.id = (maxId + 1).toString();
    item.title = $("#title").val().trim();
    item.url = $("#url").val().trim();
    if(!item.url.startsWith("http")){
      item.url = "http://" + $("#url").val().trim();
    }
    $(".setting-content").addClass("hidden");
    //item.icon = "https://www.google.com/s2/favicons?domain="+item.url; // get favicon (16X16)
    item.icon = "https://api.statvoo.com/favicon/?url="+item.url; // get favicon (64X64)

    shortcuts.push(item);
    dumpShortcuts(shortcuts);
    clearSetting();
    $(".setting-content").addClass("hidden");
  }
});

$(".col-3.close").click(function(){
  clearInvalids();
  clearSetting();
  $(".setting-content").addClass("hidden");
});