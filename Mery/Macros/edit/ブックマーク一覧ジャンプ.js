#title="ブックマーク一覧"
 /*
 * ブックマーク一覧をポップアップメニューにして選択ジャンプ
 * Mery標準のブックマークが対象
 * 範囲選択中の場合は選択範囲を拡大
 */
 (function(){
   // 描画停止
   Redraw = false;
   with(document.selection){
     var flgBlock = !isEmpty;
     //カーソル位置の保存
     var activePos = GetActivePos();
     var anchorPos = GetAnchorPos();
     var sX = ScrollX;
     var sY = ScrollY;
 
     var bookmarks = new Array();
     StartOfDocument(false);
     // 先頭行がブックマークされてないか
     var isTopMarked = false;
     CharRight(false);
     if(PreviousBookmark()){
       isTopMarked = true;
       SelectLine();
       //menuKey = Text.slice(0,24).replace(/\t/g, "\\t");
       menuKey = Text.slice(0,80).replace(/\t/g, " ");
       Collapse();
       bookmarks.push("Line " + GetActivePointY(mePosLogical) + ":\t" + menuKey);
     } else {
       StartOfDocument(false);
     }
     while(NextBookmark()){
       SelectLine();
       //menuKey = Text.slice(0, 24).replace(/\t/g, "\\t");
       menuKey = Text.slice(0, 80).replace(/\t/g, " ");
       Collapse();
       bookmarks.push("Line " + GetActivePointY(mePosLogical) + ":\t" + menuKey);
     }
     var bmcount = bookmarks.length;
     if(bmcount == 0){
       //カーソル位置の復帰
       SetActivePos(activePos);
       SetAnchorPos(anchorPos);
       ScrollX = sX;
       ScrollY = sY;
     } else {
       var BookmarkMenu = CreatePopupMenu();
       for(var i = 0; i < bmcount; i++){
         //メニューのアクセスキーも1から始まるほうが便利
         BookmarkMenu.Add("&" + (i+1) + " " + bookmarks[i], i+1)
       }
       var ret = BookmarkMenu.Track(0);
       if(ret == 0){
         //カーソル位置の復帰
         SetActivePos(activePos);
         SetAnchorPos(anchorPos);
         ScrollX = sX;
         ScrollY = sY;
       } else {
         StartOfDocument(false);
         if(isTopMarked)ret--;
         for(i = 0; i < ret; i++){ NextBookmark(); }
       }
     }
     if(flgBlock){
       //ジャンプ前の選択開始位置からジャンプ後のカーソル位置まで範囲選択
       SetAnchorPos(anchorPos);
     }
   }
   // 描画再開
   Redraw = true;
 })()
 