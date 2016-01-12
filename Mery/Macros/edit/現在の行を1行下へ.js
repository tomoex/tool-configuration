document.selection.SelectLine();
var text = document.selection.Text;
document.selection.Delete();
document.selection.LineDown();
document.selection.Text = text;
document.selection.LineUp();
