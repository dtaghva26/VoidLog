# Voidlog Product Backlog

---

# Epic 1 — User Accounts & Identity

## Story 1 — User Registration with Role
As a user  
I want to register as a **gamer or developer**  
So that the app can personalize my logging experience.

### Acceptance Criteria
- User can choose role: Gamer or Developer
- Role is stored in the user profile
- Role can influence prompts or themes
- Registration requires email and password

---

## Story 2 — User Login
As a user  
I want to log into my account  
So that I can access my personal logs.

### Acceptance Criteria
- User can log in with email and password
- Invalid credentials show an error message
- Successful login redirects to dashboard

---

## Story 3 — User Logout
As a user  
I want to log out of the application  
So that my account remains secure.

### Acceptance Criteria
- Logout button is available
- Session is terminated after logout
- User is redirected to login screen

---

## Story 4 — Password Reset
As a user  
I want to reset my password  
So that I can regain access if I forget it.

### Acceptance Criteria
- User can request password reset
- Reset link is sent to email
- User can set a new password

---

# Epic 2 — Log Entries

## Story 5 — Create Log Entry
As a user  
I want to create a log entry  
So that I can record my gaming or coding experience.

### Acceptance Criteria
- User can open "New Log"
- User can write title and content
- Entry is saved with timestamp
- Entry appears in timeline

---

## Story 6 — Select Activity Type
As a user  
I want to mark a log as **gaming or coding**  
So that my entries are categorized.

### Acceptance Criteria
- User can select activity type
- Activity is saved with entry
- Timeline shows activity type

---

## Story 7 — Mood Tracking
As a user  
I want to record my mood for each entry  
So that I can track how I feel during sessions.

### Acceptance Criteria
User can select mood from options:
- Focused
- Frustrated
- Proud
- Tired
- Calm
- Excited

Mood is stored with entry.

---

## Story 8 — Edit Entry
As a user  
I want to edit my log entry  
So that I can correct or update my reflection.

### Acceptance Criteria
- User can open existing entry
- Edit title/content/mood
- Save updates successfully

---

## Story 9 — Delete Entry
As a user  
I want to delete a log entry  
So that I can remove unwanted entries.

### Acceptance Criteria
- Delete button is available
- Confirmation dialog appears
- Entry is permanently removed

---

# Epic 3 — Log Organization

## Story 10 — Tag Entries
As a user  
I want to add tags to entries  
So that I can organize my logs.

### Acceptance Criteria
User can add tags such as:
- #bug
- #achievement
- #idea
- #burnout

Tags are saved with entry.

---

## Story 11 — Search Logs
As a user  
I want to search my logs  
So that I can find past experiences quickly.

### Acceptance Criteria
User can search by:
- keyword
- tag
- mood

Results return matching entries.

---

## Story 12 — Filter Entries
As a user  
I want to filter my logs  
So that I can browse specific types of entries.

### Acceptance Criteria
Filters include:
- gaming logs
- coding logs
- mood
- date range

---

# Epic 4 — Timeline & Dashboard

## Story 13 — Timeline View
As a user  
I want to see my logs in chronological order  
So that I can review my digital history.

### Acceptance Criteria
- Entries appear newest first
- Entry preview is visible
- Clicking opens full entry

---

## Story 14 — Dashboard Overview
As a user  
I want a dashboard summary  
So that I can see quick insights about my logs.

### Acceptance Criteria
Dashboard shows:
- total logs
- recent logs
- mood distribution
- gaming vs coding activity

---

# Epic 5 — Gamification

## Story 15 — Logging Streak
As a user  
I want to build a daily logging streak  
So that I stay consistent with reflection.

### Acceptance Criteria
- System tracks consecutive days logged
- Streak displayed on dashboard
- Streak resets if user skips a day

---

## Story 16 — XP System
As a user  
I want to earn XP for logging  
So that logging feels rewarding.

### Acceptance Criteria
XP rules:
- new log +10 XP
- add mood +3 XP
- add tags +2 XP

XP contributes to user level.

---

## Story 17 — Achievements
As a user  
I want to unlock achievements  
So that my progress feels meaningful.

### Acceptance Criteria
Example achievements:
- First Log
- 7 Day Streak
- 50 Logs
- Midnight Logger

Achievement unlock triggers notification.

---

# Epic 6 — Insights

## Story 18 — Mood Statistics
As a user  
I want to see mood statistics  
So that I can understand emotional patterns.

### Acceptance Criteria
System shows:
- most common mood
- mood distribution chart

---

## Story 19 — Activity Insights
As a user  
I want to see insights about gaming vs coding sessions  
So that I understand how each activity affects me.

### Acceptance Criteria
System displays:
- percentage gaming logs
- percentage coding logs
- mood comparison

---

# MVP Scope

Initial release should include:

- user registration/login
- role selection (gamer/developer)
- create/edit/delete entries
- timeline
- mood tracking
- tagging
- search

Gamification and analytics may follow in later iterations.
