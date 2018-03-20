// all shortcuts will show on the new tab
let list = [
   {title: chrome.i18n.getMessage("YouTube"),   url: "https://www.youtube.com/?gl=TW", icon: "https://lh3.googleusercontent.com/I95wjYii8vhFSSx-aSYdh2hPAMjgZkA9yjarSQoOd98COwOxkAVn_dulBcTcfbsa7Limy6IKX6G95ep6OB6y2yMLMiX0YEqFx3KQHQ=h120"},
   {title: chrome.i18n.getMessage("Inbox"),     url: "https://inbox.google.com", icon: "https://lh3.googleusercontent.com/UXhkrrFp4MRBt-cDQQS8dBa6zkZ1OSjTESy-vObB7DfTzXmLtllD4hVD0Y8AH1VJN_wBh2KXU7SY5Q5zh0gcq4wVfWSSS825SvedWA=h120"},
   {title: chrome.i18n.getMessage("Map"),       url: "https://maps.google.com", icon: "https://lh3.googleusercontent.com/h2xmmkP-_RPM8kimxiZ0brUD_O16N5YsSrJA8srYewnR4Ay0fSevp51AKpIItoQY9ndhdGZFoi-wyAXNxE5mI_xQRVMdJtbAmStE1g=h120"},
   {title: chrome.i18n.getMessage("Calendar"),  url: "https://www.google.com/calendar", icon: "https://lh3.googleusercontent.com/Wj2TC83OMCWpHPH9R-ebuLwseO5cPbsoaM8YEx3oRcakA2Ck4OG-SVv9YrYE4arZ_jC2VnImXJdr1xJognMvnmAQcZtdc54vKttQew=h128"},
   {title: chrome.i18n.getMessage("Play"),      url: "https://play.google.com", icon: "https://lh3.googleusercontent.com/vWJNEFxN3WY5PYAYjwZ9ycEXMCCiB8EbcFXZxfSv5xkKLw67C2J5qXJTBL9KSPldWmLpVMnucrsDBmPlrf9tMiEJpYNZNcTw_ymlxgc=h120"},   
   {title: chrome.i18n.getMessage("Drive"),     url: "https://drive.google.com/?authuser=0", icon: "https://lh3.googleusercontent.com/A-jk5o_CT_ucUdRRwmchoeMx1qoKolfGKFptEBHANKZELMmeJALE7m4KOZdDu0NjFNiekH0j2T981f5N_nZ_IU1HsRehKLPRQAX0=h120"},   
   {title: chrome.i18n.getMessage("Keep"),      url: "https://keep.google.com/u/0", icon: "https://lh3.googleusercontent.com/BG7WQTW1miMA7lsBFNyWnnIlm0SBceVj5-NCYQmtU3Zmys-n7xPva5fs9loQuA75f12ZiS6C7Yh9G_X1ISsFLKplLYPz09MKbUmjew=h120"},   
   {title: chrome.i18n.getMessage("Blogger"),   url: "https://www.blogger.com/", icon: "https://lh3.googleusercontent.com/JtYUq9HfkkOryxudgp34oqI8qFu9a6mmL64OXjcDX7mfEwcX_pxmTdurvxssofY4swTY2c_M1Kk5o1a863CGTiBZkxxuYXfjiNgz=h120"}
];

// create shortcuts
function dumpShortcuts(items){
   if(!!items){
      $('.item_list').empty();
      items.forEach(function(item){
         $('.item_list').append(dumpNode(item));         
      });
   }
}

// create HTML element for each shortcut
function dumpNode(node){
   let root = $('<li class="item_icon">');
   let link = $('<a>');
   link.attr('href', node.url);
   
   let img = $('<img>');
   img.attr('src', node.icon);
   link.append(img);
   root.append(link);
   
   let title = $('<div class="item_title">');
   title.text(node.title);
   root.append(title);
   return root;
}

dumpShortcuts(list);