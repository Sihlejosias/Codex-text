from tkinter import *
from tkinter import filedialog
from tkinter import font

root =Tk()
root.title('Codex Editor')
# root.geometry("1200x660")

# Main frame
my_frame = Frame(root)
my_frame.pack(pady=5)

text_scroll = Scrollbar(my_frame)
text_scroll.pack(side=RIGHT, fill=Y)

#text area
textarea = Text(my_frame, width=97, height=25, font=("Helvetica", 10), selectbackground="yellow", selectforeground="black", undo=True, yscrollcommand=text_scroll.set)
textarea.pack()

text_scroll.config(command=textarea.yview)


my_menu = Menu(root)
root.config(menu=my_menu)

file_menu = Menu(my_menu, tearoff=False)
my_menu.add_cascade(label="File", menu=file_menu)
file_menu.add_command(label="Open")
file_menu.add_command(label="New")
file_menu.add_command(label="Save")
file_menu.add_separator()
file_menu.add_command(label="Exit", command=root.quit)

edit_menu = Menu(my_menu, tearoff=False)
my_menu.add_cascade(label="Edit", menu=edit_menu)
edit_menu.add_command(label="Cut")
edit_menu.add_command(label="Copy")
edit_menu.add_command(label="Undo")
edit_menu.add_command(label="Redo")


status_bar = Label(root, text=' UNTITLED', anchor=W)
status_bar.pack(fill=X, side=BOTTOM, ipady=5)

root.mainloop()