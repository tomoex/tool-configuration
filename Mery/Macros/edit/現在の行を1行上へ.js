document.selection.SelectLine();
var text = document.selection.Text;
document.selection.Delete();
document.selection.LineUp();
document.selection.Text = text;
document.selection.LineUp();
