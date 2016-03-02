
# TITLE: Working with git
## for sample project: mapdemos

### NOTE: Wherever you see USERNAME below, put your own user name.

## Introduction

Git is a source control system.  It is typically used to maintain control of
source code and make sure that changes are recorded and never lost.
When using git, we're typically concerned with three different locations:

(1) your working directory -- the folder on your machine where
you'll be editing your project.

(2) the local repository -- hides inside the hidden .git folder in your
working directory.  This is a complete copy of the repository.
Do not directly change anything in the hidden .git folder.  Look, don't touch.

(3) a remote repository -- a safe store from where we'll pull down other
people's changes, and do merges locally (mostly automatically,
sometimes manually), and we'll also push our changes to it.
Typically, this would be hosted on a corporate server, or a cloud server
on the Internet.  Many teams use private repositories on github.com.
It's typically known by it's URL: https://github.com/billtrowbridge/mapdemos

##### Git weaknesses:

Git does not itself maintain history across renames or moving files
from directory to directory.  Therefore, it's a good idea to determine and
set up your directory structure before you start adding a lot files
to your project.  It's a good idea to look at a lot of other public
github repositories to see how they are organized.

Most of the git commands used below are very simple usages.  The commands
often support many command-line options, and can be very complex.

(1) Install git from https://git-scm.com/downloads

If on windows, choose the options to install just the Windows stuff.

NOTE: git comes with a built-in GUI Tool called git-gui.  It's not great.
At some later time, you might want to become familiar with that,
or download the "GitHub Desktop" GUI Client (which I sometimes use)
from https://git-scm.com/downloads/guis
or try some other gui downloaded from the same place.

Many development environments have git extensions built in.  Both the
Google Android Studio and Microsoft Visual Studio have such extensions.
It's an add-in for Visual Studio.

(2) Make a directory where you will keep some of your "working directories".

This is where you will keep and work on the projects.
I made mine at:
    C:/users/USERNAME/Documents/GitHub/

(3) Make a new "working directory" somewhere on your system.

I made mine at:
    C:/users/USERNAME/Documents/GitHub/mapdemos
This is where we'll work on this particular project.

(4) (optional, or any time)

I have set up a public sample repository on github.
You can use your browser and go to this URL to see it.
    https://github.com/billtrowbridge/mapdemos

(5) For these instructions, we'll be doing most of the commands in a command window.

If you have a folder open in Windows Explorer, you can do shift-right-click and
select "Open command window here" to open a command window at that directory.
Or, press the Windows button, enter "cmd" and press enter.
Then enter this command:
```
    > cd C:/users/USERNAME/Documents/GitHub
```
Make sure you're in the command window in that directory.
        
(6) Enter:
```
    > git status
```
The git executable should run, and it should show that there is no repository here.
"git status" is always optional, but we'll be doing it a lot to show
what's going on.
If the git executable does not run, it probably needs to be added to the DOS path.

(7) Configure git so that it knows who you are.

If you don't have a github account, sign up for a free account now.
    https://github.com/
If you already have a github account, use the name and email that you used for github.
Put your name and email address inside the quotes below.  Omit the brackets.
```
    > git config --global user.name "[name]"
    > git config --global user.email "[email address]"
```

(8) Enter:
```
    > git clone https://github.com/billtrowbridge/mapdemos
or
    > git clone https://github.com/billtrowbridge/mapdemos.git
```
The ".git" at the end is optional.
It should show "cloning" and eventually "done".
This clones the remote repository from my server to your local repository.
Both will now have the ENTIRE repository, all history, everything.
Git is a distributed source control system, so no git repository is a master.
All are equal.  A very common pattern to use is to have a main repository
out on the internet, and each user has a cloned repository on their own machine.
This is the pattern we will typically use.

(9) Enter:
```
    > cd mapdemos
    > git status
```    
We're now in the the local "working directory"
    C:/users/USERNAME/Documents/GitHub/mapdemos
It should say that the branch is up-to-date.
At this point, you have the whole repository, and you have a working directory
with all the contents.  You can edit/add/delete files as you will.

(10) Enter:
```        
        > dir
```
This should show files in the working directory, including README.md,
which is a file shown on the main page of the github project.
It is a text file which can also contain markdown code to mark
headings, bold, links, lists, etc.
See https://help.github.com/articles/getting-started-with-writing-and-formatting-on-github/



# COMING SOON

### The work cycle:

changing files in your working directory
adding files to the local repository
    > git add .
committing files to the local repository
    > git commit -m "Fixed whatever, etc"

getting file changes from the remote repository -- IMPORTANT, TO AVOID OVERWRITING
    > git pull

resolving differences
    ????

pushing changes to the remote repository
    > git push https://github.com/billtrowbridge/mapdemos
  or
    > git push https://github.com/billtrowbridge/mapdemos.git
  but, if you cloned a project, it remembers where it came from, so this works:
    > git push
  If you haven't cloned it, it's possible to carefully change .git/config
  so it knows the remote repository.


### Extra:

making a brand new empty repository
    create and move to a new directory
    > git init

making a repository from a directory with a existing project
    > git init			????
    > git add .			????
    Continue with the reguler commit and push commands.


.gitignore
.gitattributes

----------------

(11) Create a new file
```
        > echo "This is a new file." > newfile.txt
```

### More:

Using a different editor (not vim):

    http://stackoverflow.com/questions/2596805/how-do-i-make-git-use-the-editor-of-my-choice-for-commits
    
    https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration

### Good Git Help Links

http://classic.scottr.org/presentations/git-in-5-minutes/

https://training.github.com/kit/downloads/github-git-cheat-sheet.pdf






