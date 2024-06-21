Feature: Buy a ticket
    Scenario: Try to buy a ticket to the movie Zveropolis
        Given user is on "/client/index.php" page
        When user selected the date, movie and chair and clicked button Acceptin
        Then user sees the line to contain "Покажите QR-код" 

    Scenario: Try to buy a ticket to the movie Gone with the Wind
        Given user is on "/client/index.php" page
        When user selected the date, movie and free chair and clicked button Acceptin
        Then user sees the title to contain "Вы выбрали билеты"  

    Scenario: Try to buy a ticket to the movie Stalker
        Given user is on "/client/index.php" page
        When user selected the date, movie and buying chair and trying to click on button Acceptin
        Then user sees that the resirved button is not clickable 'disabled'     
