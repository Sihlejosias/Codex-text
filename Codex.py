from tkinter import *
from tkinter import filedialog
from tkinter import font

root =Tk()
root.title('Polette Editor')

# Main frame
my_frame = Frame(root)
my_frame.pack(pady=5)

# create a new file 
def new_file():
    textarea.delete("1.0", END)
    root.title('UNTITLED - Polette')
    status_bar.config(text="UNTITLED")


# Opens ficles
def open_file():
    textarea.delete("1.0", END)
    text_file = filedialog.askopenfilename(initialdir="~/Desktop/", title="Open File", filetypes=(("Text Files", "*.txt"), ("HTML Files", "*.html"), ("Python Files", "*.py"), ("All Files", "*.*")))
    name = text_file
    status_bar.config(text=f'{name}')
    name = name.replace("~/Desktop/", "")
    root.title(f'{name} - Polette')
    text_file = open(text_file, 'r')
    stuff = text_file.read()
    textarea.insert(END, stuff)
    text_file.close()


# save as 
def save_as_file():
    text_file = filedialog.asksaveasfilename(defaultextension=".*", initialdir="~/Desktop/", title="Save File", filetypes=(("Text Files", "*.txt"), ("HTML Files", "*.html"), ("Python Files", "*.py"), ("All Files", "*.*")))
    if text_file:
        name = text_file
        status_bar.config(text=f'Saved: {name}')
        name = name.replace("~/Desktop/", "")
        root.title(f'{name} - Polette')
        text_file = open(text_file, 'w')
        text_file.write(textarea.get(1.0, END))
        text_file.close()


text_scroll = Scrollbar(my_frame)
text_scroll.pack(side=RIGHT, fill=Y)

#text area
textarea = Text(my_frame, width=97, height=25, font=("Helvetica", 10), selectbackground="yellow", selectforeground="black", undo=True, yscrollcommand=text_scroll.set)
textarea.pack()

text_scroll.config(command=textarea.yview)

#Menu
my_menu = Menu(root)
root.config(menu=my_menu)

file_menu = Menu(my_menu, tearoff=False)
my_menu.add_cascade(label="File", menu=file_menu)
file_menu.add_command(label="Open", command=open_file)
file_menu.add_command(label="New", command=new_file)
file_menu.add_command(label="Save")
file_menu.add_command(label="Save As", command=save_as_file)
file_menu.add_separator()
file_menu.add_command(label="Exit", command=root.quit)

edit_menu = Menu(my_menu, tearoff=False)
my_menu.add_cascade(label="Edit", menu=edit_menu)
edit_menu.add_command(label="Cut")
edit_menu.add_command(label="Copy")
edit_menu.add_command(label="Paste")
edit_menu.add_command(label="Undo")
edit_menu.add_command(label="Redo")


status_bar = Label(root, text=' UNTITLED', anchor=W)
status_bar.pack(fill=X, side=BOTTOM, ipady=5)

root.mainloop()