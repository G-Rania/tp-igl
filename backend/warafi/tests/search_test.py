from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Create a new instance of the Firefox driver
driver = webdriver.Firefox()

# Open the HTML page where you want to perform the search
driver.get("http://localhost:3000/users/home")  # Replace this with the actual path to your HTML file

try:
    username_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "username"))
    )
    password_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "password"))
    )
    login_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.ID, "loginButton"))
    )

    username_input.send_keys("imed")
    password_input.send_keys("10")
    login_button.click()
    # Find the search input field by its ID and input your query
    search_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "searchInput"))
    )
    search_input.send_keys("AI")

    # Find the search button by its ID and click it
    search_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.ID, "searchButton"))
    )
    search_button.click()
except:
    print("problem while testing")    