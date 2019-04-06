
        // You can do this to perform a global override of any of the "default" options
        // jHtmlArea.fn.defaultOptions.css = "jHtmlArea.Editor.css";

        $(function() {
            var esc = false;
        /*
            resizeHtmlEditor();
            $(window).resize(resizeHtmlEditor);
            // $("textarea").htmlarea({
            toolbar: ["bold","italic"]});
            // $("#content1").htmlarea();

            $("#textarea1").htmlarea({
            toolbar: ["html","bold", "italic", "underline", "|", "h1", "h2", "h3", "h4", "h5", "h6", "|", "link", "unlink", "|",
                    {
                        css: "custom_disk_button", // This is how to add a completely custom Toolbar Button
                        text: "Save",
                        action: function(btn) {
                            // 'this' = jHtmlArea object
                            // 'btn' = jQuery object that represents the <A> "anchor" tag for the Toolbar Button
                            alert('SAVE!\n\n' + this.toHtmlString());
                        }
                    }
                    
                ], // Overrides/Specifies the Toolbar buttons to show
                css: "jHtmlArea.Editor.css", // Specify a specific CSS file to use for the Editor
                loaded: function() { // Do something once the editor has finished loading
                    //// 'this' is equal to the jHtmlArea object
                    //alert("jHtmlArea has loaded!");
                    //this.showHTMLView(); // show the HTML view once the editor has finished loading
                }
            });
        */
           $("[name^='content']").htmlarea({toolbar: [["html"],["bold", "italic","underline",
               "strikethrough","|","subscript","superscript"],["forecolor"],
               ["orderedList","unorderedList"],["indent","outdent"],["justifyleft",
               "justifycenter","justifyright",{
                        css: "justify_button",
                        text: "Justify",
                        action: function(btn) {
                            this.ec("justifyFull",false,null);
                        }
               }],[{
                        css: "remove_formatting_button",
                        text: "Remove Formatting",
                        action: function(btn) {
                            this.ec("removeFormat",false,null);
                        }
               }],["link","unlink","|","image",{
                        css: "upload_button", // This is how to add a completely custom Toolbar Button
                        text: "Upload Image",
                        action: function(btn) {
                            // 'this' = jHtmlArea object
                            // 'btn' = jQuery object that represents the <A> "anchor" tag for the Toolbar Button
                            $("#ulModal").modal();
                        }
                    },"|","horizontalrule"],
               [{
                        css: "undo_button", // This is how to add a completely custom Toolbar Button
                        text: "Undo (Ctrl+Z)",
                        action: function(btn) {
                            // 'this' = jHtmlArea object
                            // 'btn' = jQuery object that represents the <A> "anchor" tag for the Toolbar Button
                            // $("#ulModal").modal();
                            this.ec("undo",false,null);
                        }
                    },{
                        css: "redo_button", // This is how to add a completely custom Toolbar Button
                        text: "Redo (Ctrl+Y)",
                        action: function(btn) {
                            // 'this' = jHtmlArea object
                            // 'btn' = jQuery object that represents the <A> "anchor" tag for the Toolbar Button
                            // $("#ulModal").modal();
                            this.ec("redo",false,null);
                        }
                    }],["p","hd1","hd2","hd3","hd4","hd5","hd6"],[{
                        css: "icon_button",
                        text: "Insert Icon",
                        action: function(btn) {
                            this.toolbar.trigger("dblclick");
                        }
                    }],[{
                        css: "css_button", // This is how to add a completely custom Toolbar Button
                        text: "Enter/Modify Website CSS",
                        action: function(btn) {
                            // 'this' = jHtmlArea object
                            // 'btn' = jQuery object that represents the <A> "anchor" tag for the Toolbar Button
                            // $("#ulModal").modal();
                            $("#cssModal").modal();
                            $("#cssModal").on('shown.bs.modal', function () {
                               document.getElementById("css").focus();
                            });
                        }
                    }]], loaded: function() {
                               var esc = false;
                               //alert("This is a test");
                               var x = this.iframe[0].contentWindow.document;
                               var p = this;
                               $("head",x).html(
                                "<base href='https://www.gem-editor.com/gwc/'><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><style></style>");
                               $("body",x).css({"background-color":"white","background-image":"none"});
                               $("body",x).keydown(function(event){              
                                  if (event.keyCode==27) esc=true;
                                  if (event.keyCode==18) window.focus();
                               });
                               $("body",x).keypress(function(event){              
                                   if (esc==true) {
                                      var ch = esc_code(event.keyCode || event.charCode);
                                      event.preventDefault();
                                      if (ch.charCodeAt(0)!=27) {
                                         p.ec("insertText",false,decodeURI(ch));
                                         esc=false;
                                      }
                                   }
                               });
                               $(this.toolbar).dblclick(function(){
                                   //alert(navigator.appVersion.indexOf('Edge') > -1);
                                    $("#iconsModal").modal({backdrop: false});
                                    $("#iconslist div,#emojilist div").on("dblclick",function(){
                                       //alert(p);
				       sel = $(this).text();
                                       if (sel) {
                                          $("#iconsModal").modal("hide");
                                          var pn = p.textarea.val();
                                          var ces = encodeURI(sel);
                                          //alert(encodeURI($(p).siblings("textarea").val()));
                                          if (ces.slice(0,3)=="%EF") {
                                             if ((!!document.documentMode) || (navigator.appVersion.indexOf('Edge') > -1)) {
                                                //alert("test");
                                                $(p.textarea).val(pn + "<i class='fa'>" + sel + "</i>&nbsp;");
                                                $(p.textarea).htmlarea("updateHtmlArea");
                                             } else p.ec("insertHTML",false,"<i class='fa'>" + sel + "</i>&nbsp;");
                                          } else if ((!!document.documentMode) || (navigator.appVersion.indexOf('Edge') > -1)) {
                                                     $(p.textarea).val(pn + sel);
                                                     $(p.textarea).htmlarea("updateHtmlArea");
                                                     } else p.ec("insertText",false,sel);
                                          $("#iconslist div,#emojilist div").off("dblclick");
                                       }
                                    });
                               });
                            }
           });
           //$("[name^='content']").htmlarea({
           //    loaded: function() {
           //       alert("This is a test");
           //    }
           //});
           //$(".upload_button").html("<i class='fa fa-upload fa-fw'></i>");
           //$(".undo_button").html("<i class='fa fa-undo fa-fw'></i>");
           $(".justify_button").parent().addClass("hidden-xs");
           $(".remove_formatting_button").parent().parent().addClass("hidden-xs");
           $(".icon_button").parent().parent().addClass("hidden-xs");
           $("[name^='content']").keydown(function(event){
              if (event.which==27) esc = true;
           });
           $("[name^='content']").keypress(function(event){
                 if (esc==true) {
                    var ch = esc_code(event.which);
                    event.preventDefault();
                    document.execCommand("insertText",false,decodeURI(ch));
                    esc=false;
                 }
           });
           icons_display();
	   emoji_display();
	   $("#picon1,#picon2,#picon3,#picon4,#picon5,#picon6").click(function(){
              //$(this).hide();
              var p = this;
              $("#iconsModal").modal({backdrop: false});
              $("#iconslist div,#emojilist div").on("dblclick",function(){
                 //alert(p);
		 sel = $(this).text();
                 if (sel) {
                    $("#iconsModal").modal("hide");
                    var ces = encodeURI(sel);
                    var toc = "";
                    if (ces.slice(0,3)!="%EF") toc = "%EF%B8%8E";
	            $(p).prev().html("<i class='fa'>" + sel.trim() + decodeURI(toc) + "</i>");
                    $("#iconslist div,#emojilist div").off("dblclick");
	            p.focus();
                 }
              });
	   });
	   $("#picon1,#picon2,#picon3,#picon4,#picon5,#picon6").attr(oncontextmenu: "icon_rm(event,this)", ondblclick: "icon_rm(event,this)");
           $("#pname1,#pname2,#pname3,#pname4,#pname5,#pname6,.ToolBar").attr("oncontextmenu","icon_rc(event,this);");
           //if(screen.width <= 750) document.getElementById("theme2").selected = true;
           //$("#iconsModal").modal({backdrop: false});
           $("#pname1,#pname2,#pname3,#pname4,#pname5,#pname6").blur(function(){
              var r = delist(this.value);
              update_state(r,this);
	      if ($(this).prev().text()!="")
		 $(this).parent().parent().parent().next().val($(this).prev().text() + " " + this.value);
	      else $(this).parent().parent().parent().next().val(this.value);
           });
           $(".has-feedback [name^='file']").change(function(event){
              //alert("This is a test");
              var r = image_file_va(event);
              update_state(r,this);
              if (r==1) clear_pimage(this);
           });
           /*$(".ToolBar").dblclick(function(){
              var p = this;
              $("#iconsModal").modal({backdrop: false});
              $("#iconsDisp").on("dblclick",function(){
                 //alert(p);
                 $("#iconsModal").modal("hide");
                 var pn = $(p).siblings("textarea").val();
                 var ces = encodeURI(window.getSelection());
                 //alert(encodeURI($(p).siblings("textarea").val()));
                 if (ces.slice(0,3)=="%EF")
                    $(p).siblings("textarea").val(pn + "<i class='fa'>" + window.getSelection() + "</i>&nbsp;");
                 else $(p).siblings("textarea").val(pn + window.getSelection());
                 $(p).siblings("textarea").htmlarea('updateHtmlArea');
                 $("#iconsDisp").off("dblclick");
              });
           });*/
           $("#iconsbtn").click(function(){
	      $("#iconslist").show();
	      $("#emojilist").hide();
	      $("#iconsDisp").scrollTop(0);
           });
           $("#emojisbtn").click(function(){
	      $("#iconslist").hide();
	      $("#emojilist").show();
	      $("#iconsDisp").scrollTop(0);
           });
           $("#iconscls").click(function(){
              $("#iconslist div,#emojilist div").off("dblclick");
           });
           $("#optbtn,#optmi").click(function(){
              //alert($("#ptext1").html());
              $("#optModal").modal({backdrop: false});
           });
           $("#cssbtn").click(function(){
              document.getElementById("clsbtn1").click();
              $("#cssModal").modal();
              $("#cssModal").on('shown.bs.modal', function () {
                 document.getElementById("css").focus();
              });
           });
           $("#opnbtn,#opnmi").click(function(){
              document.getElementById("clsbtn1").click();
              $("#wsfile").val('');
              $("#openModal").modal();
           });
           $("#opncss").click(function(){
              $("#cssfile").val('');
              $("#opencssModal").modal();
           });
           $("#newcss").click(function(){
              if ($("#css").val()!="")
                 if (confirm("Clear or start new CSS?")) $("#css").val("");
           });
           $("#subbtn").click(function(){
              if ($("div").hasClass("has-error"))
                 alert("Please correct any errors on this page before continuing.");
              else if ($("#title").val()=="") {
                      alert("Please enter title before continuing.");
                      $("#optModal").modal({backdrop: false});
                   } else this.form.submit();
           });
           $("#submi").click(function(){
              $("#subbtn").trigger("click");
           });
           $("#rstbtn").click(function(){
              if (confirm("Reset contents of all pages?")) reset_form();
           });
           $("#wsfile").change(function(event){
              readSingleFile(event);
           });
           $("#cssfile").change(function(event){
              readCSSFile(event);
           });
           if(location.search=="?ow=1") $('#openModal').modal();
        });

function resizeHtmlEditor() {
    $('div.jHtmlArea').find('div.ToolBar').css('width', '100%');
    $('div.jHtmlArea').css('width', '100%');
    //if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    if(screen.width < 400) {
       $('div.jHtmlArea textarea').css('height', '300px');
    } else $('div.jHtmlArea textarea').css('height', '200px');
    $('div.jHtmlArea').height($('div.jHtmlArea textarea').height() + 44);
    // $('div.jHtmlArea iframe').css('width', '100%');
    $('div.jHtmlArea iframe').width($('div.jHtmlArea').width());
    $('div.jHtmlArea iframe').height($('div.jHtmlArea').height() - $('div.ToolBar').height() - 6);
}

function css_update_ta() {
    for (var i=0;i<6;i++) {
       var x = window.frames[i].document.getElementsByTagName("STYLE");
       x[0].innerHTML = $("#css").val();
    }
}

function delist(v)
{
   var st = 0;
   //alert("This is a test." + v);
   if (v != "") {
      st++;
      var ct=0;
      for (var i=1;i <= 6; i++)
      {
         var vi = $("#pname" + i).val();
         if (v==vi) ct++;
      }
      if (ct>1) {
         st++;
         $("#myModal").modal();
      }
   }
   //pname_update();
   for (var i=1;i <= 9; i++)
      document.getElementById("option"+i).disabled=false;
   for (var i=1;i <= 6; i++)
   {
      var vi = $("#pname" + i).val();
      for (var j=1;j <= 9; j++)
      {
         var dle = document.getElementById("option"+j);
         if (vi==dle.value) dle.disabled=true;
      }
   }
   return st;
}

function clear_pimage(th) {
   var x = $(th).parent().parent().siblings().children("input");
   x.val("");
   x.hide();
}

function reset_form() {
   document.getElementById("webdata").reset();
   $("[name^='pimage']").hide();
   $("#picon1,#picon2,#picon3,#picon4,#picon5,#picon6").html("");
   $("#pname1,#pname2,#pname3,#pname4,#pname5,#pname6").each(function() {
      var r = delist(this.value);
      update_state(r,this);
   });
   $(".has-feedback [name^='file']").each(function() {
      update_state(0,this);
   });
   $("[name^='content']").each(function() {
      $(this).val("");
      $(this).htmlarea("updateHtmlArea");
   });
   $("#ctform").prop("checked",false);
   $("#css").text("");
   css_update_ta();
   //if(screen.width <= 750) document.getElementById("theme2").selected = true;
}

function pname_update() {
   for (var i=1;i <= 6;i++) {
       var v = $("#pname" + i).val();
       if (v != "") $("#ptext" + i).html("<i class='fa'>Page " + i + " - " + v + "</i>");
          else $("#ptext" + i).html("<i class='fa'>Page " + i + "</i>");
   }    
}

function icons_display() {
   var st = "";
   $("#iconslist").html("");
   for (var i=0;i<740;i++) {
      var hv = String.fromCharCode(0xf000 + i);
      st += "<div>"+hv+"</div>";
      //$("#iconsDisp").append("<i class='fa fa-fw'>"+hv+"</i>");
   }
   $("#iconslist").html(st);
}

function emoji_display() {
   var st = "";
   $("#emojilist").html("");
   for (var i=0x8c;i<0xa8;i++)
      for (var j=0x80;j<0xc0;j++) 
         st += "<div>" + decodeURI('%f0%9f%'+i.toString(16)+'%'+j.toString(16)) + "</div>";
         //$("#iconsDisp").append("<i class='fa fa-fw'>"+decodeURI('%f0%9f%'+i.toString(16)+'%'+j.toString(16))+"</i>");
      //st += "<br>"+ i.toString(16) + "<hr>";   
   for (i=0;i<3072;i++) {
      hv = String.fromCharCode(0x2000 + i);
      st += "<div>"+hv+"</div>";
      //$("#iconsDisp").append("<i class='fa fa-fw'>"+hv+"</i>");
   }
   $("#emojilist").html(st);
}

function icon_rc(event,th) {
   if (th.value!="" && window.getSelection()=="") {
      event.preventDefault();
      $(th).trigger("dblclick");
   }
}

function icon_rm(event,th) {
   if ($(th).html()!="" && window.getSelection()=="") {
      event.preventDefault();
      if(confirm("Do you want to delete icon?")) {
	 $(th).html("");
	 th.nextElementSibling.focus();
      }
   }
}

function image_file_va(evt) {
   var st = 0;
   var f = evt.target.files[0]; 

    if (!f) {
        st = 0;
    } else if (!(f.name.match(/jpg/i) || f.name.match(/jpeg/i) || f.name.match(/gif/i)
              || f.name.match(/png/i))) {
		    alert(f.name + " is not a valid image file.");
		    st = 2;
    } else st = 1;
    return st;
}

function em_txt(th) {
    var xx = th.value;
    var startPos = th.selectionStart;
    var ce = xx.charCodeAt(startPos-1);
    //alert(startPos);
    if ((ce >= 0x2000) && (ce != 0xd83c) && (ce != 0xd83d) && (ce != 0xd83e) && (ce != 0xfe0e))
       document.execCommand("insertText",false,decodeURI("%EF%B8%8E"));
}

function update_state(st,th) {
    switch(st) {
       case 1:
          $(th).parent().parent().toggleClass("has-success",true);
          $(th).parent().parent().toggleClass("has-error",false);
          $(th).parent().siblings().html("&#x2705;&#xfe0f;");
          break;
       case 2:
          $(th).parent().parent().toggleClass("has-success",false);
          $(th).parent().parent().toggleClass("has-error",true);
          $(th).parent().siblings().html("&#x274e;&#xfe0f;");
          break;
       default:
          $(th).parent().parent().toggleClass("has-success",false);
          $(th).parent().parent().toggleClass("has-error",false);
          $(th).parent().siblings().html("");
    }
}

function esc_code(cd) {
    var ch = "";
    switch(cd) {
       case 48: ch="%E2%80%8D"; break;
       case 49: ch="%F0%9F%8F%BB"; break;
       case 50: ch="%F0%9F%8F%BC"; break;
       case 51: ch="%F0%9F%8F%BD"; break;
       case 52: ch="%F0%9F%8F%BE"; break;
       case 53: ch="%F0%9F%8F%BF"; break;
       case 54: ch="%EF%B8%8F"; break;
       case 55: ch="%EF%B8%8E"; break;
       default: ch=String.fromCharCode(cd);
    }
    return ch;
}

 function readCSSFile(evt) {
    //Retrieve the first (and only!) File from the FileList object
   var f = evt.target.files[0]; 

    if (!f) {
        alert("Failed to load file");
    } else if (!f.name.match(/css/i)) {
		    alert(f.name + " is not a valid CSS file.");
    } else {
             var r = new FileReader();
             r.onload = function(e) {
	              $("#css").val(e.target.result);
                document.getElementById("clsbtn3").click();
             }
             r.readAsText(f);
           }
 }

 function readSingleFile(evt) {
    //Retrieve the first (and only!) File from the FileList object
   var f = evt.target.files[0]; 

    if (!f) {
        alert("Failed to load file");
    } else if (!f.name.match(/xml/i)) {
		    alert(f.name + " is not a valid website file.");
    } else {
             var r = new FileReader();
             r.onload = function(e) {
                reset_form();
	              var contents = e.target.result;
                parser = new DOMParser();
                xmlDoc = parser.parseFromString(contents,"text/xml");
		var th = $("website",xmlDoc).attr("theme");
                if (th) $("#theme").val(th);
		var wt = $("title",xmlDoc).text();
                $("#title").val(wt);
		var st = $("style",xmlDoc).text();
                $("#css").text(st);
                css_update_ta();
		$("page",xmlDoc).each(function(i,v) {
		   var p = $(v).attr("type");
		   if (p)
		      if (p=="form") $("#ctform").prop("checked",true);
		   var pn = $(v).children("name").text();
		   $("#pn" + (i+1)).val(pn);
		   if (pn.charAt(1)==" ") {
		      $("#picon" + (i+1)).html("<i class='fa'>" + pn.charAt(0) +"</i>");
		      $("#pname" +(i+1)).val(pn.slice(2));
		   } else $("#pname" +(i+1)).val(pn);
		   delist(pn);
		   var pi = $(v).children("image").text();
		   $("#pimage" + (i+1)).val(pi);
		   if (pi.length > 0) $("#pimage" + (i+1)).show();
		   var pc = $(v).children("contents").text();
		   $("#content" + (i+1)).val(pc);
		   $("#content" + (i+1)).htmlarea('updateHtmlArea');
                });
                document.getElementById("clsbtn2").click();
                document.getElementById("pname1").focus();
             }
             r.readAsText(f);
           }
 }
