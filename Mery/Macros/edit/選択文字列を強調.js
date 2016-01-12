// -----------------------------------------------------------------------------
// 選択文字列を強調
//
// Copyright (c) Kuro. All Rights Reserved.
// www:    http://www.haijin-boys.com/
// -----------------------------------------------------------------------------
 
// 何も選択してない場合は単語を選択
with (document.selection) {
  var s = Text;
  if (s.length == 0)
    SelectWord();
  s = Text;
}
// 選択範囲が空ではない場合
if (s.length > 0) {
  with (document.selection) {
    // カーソル位置を保存
    var ax = GetActivePointX(mePosView);
    var ay = GetActivePointY(mePosView);
    // 選択開始位置を保存
    var tx = GetTopPointX(mePosView);
    var ty = GetTopPointY(mePosView);
    // 選択終了位置を保存
    var bx = GetBottomPointX(mePosView);
    var by = GetBottomPointY(mePosView);
    // 選択開始位置に移動
    SetActivePoint(mePosView, tx, ty, false);
    // 1回検索することでハイライト表示させる
    Find(s, meFindNext);
    // 選択開始位置、終了位置を復元
    if (ax == bx && ay == by) {
      SetActivePoint(mePosView, tx, ty, false);
      SetActivePoint(mePosView, bx, by, true);
    }
  }
}
