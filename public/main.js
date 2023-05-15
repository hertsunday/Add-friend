const addFriend = document.querySelector('.add-friend')
const deleteButton = document.querySelector('.delete-button')
const inputForm = document.querySelectorAll('.input-form')
const mainContainer = document.querySelector('.main-container')
const fullForm = document.querySelector('.full-form ')

let showForm = false
let countFriends = 0
let photo = ''
const arrayWithFriends = JSON.parse(localStorage.getItem('arrayWithFriends')) || []
arrayWithFriends.forEach(friend => addFriendFunc(friend.name, friend.surname, friend.data, friend.phoneNumber, friend.email, friend.image))

addFriend.addEventListener('click', createForm)
deleteButton.addEventListener('click', deleteForm)

function loadFile(event) {
    var reader = new FileReader()
    reader.onload = function() {
        photo = reader.result
    }
    reader.readAsDataURL(event.target.files[0])
}

function createForm() {
    if (!showForm) {
        fullForm.style.opacity = "1"
        fullForm.style.width = '100vw'
        fullForm.style.height = '100vh'
        fullForm.style.overflow = 'visible'

        addFriend.classList.remove('button-work')
        addFriend.classList.add('button-doesnt-work')
        
        showForm = true
    }
}

function deleteForm() {
    if (showForm) {
        fullForm.style.opacity = '0'

        setTimeout(() => {
            fullForm.style.width = '0'
            fullForm.style.height = '0'
            fullForm.style.overflow = 'hidden'
        }, 500)

        addFriend.classList.remove('button-doesnt-work')
        addFriend.classList.add('button-work')
        
        showForm = false
    }
}

function addFriendFunc(name, surname, data, phoneNumber, email, image, id) {
    countFriends++;

    const friendContainerInline = document.createElement('div')
    const friendContainerFlex = document.createElement('div')
    const friendInfo = document.createElement('div')
    const friendPhoto = document.createElement('img')
    
    friendContainerInline.id = countFriends
    friendPhoto.src = image || 'default-picture.svg';

    friendContainerInline.className = 'friend-container-inline'
    friendContainerFlex.className = 'friend-container-flex'
    friendInfo.className = 'friend-info'
    friendPhoto.className = 'friend-photo'

    function User(name, surname, data, phoneNumber, email, image, id){
        this.name = name
        this.surname = surname
        this.data = data
        this.phoneNumber = phoneNumber
        this.email = email
        this.image = image
        this.id = id
    }

    let user = new User(name, surname, data, phoneNumber, email, image, id || countFriends);
    
    friendInfo.innerHTML = `name: <span class="highlight-info">${user.name}</span>\nsurname: <span class="highlight-info">${user.surname}</span>\nbirthday: <span class="highlight-info">${user.data}</span>\nphone number: <span class="highlight-info">${user.phoneNumber}</span>\nemail: <span class="highlight-info">${user.email}</span>`
    
    setTimeout(() => {
        friendContainerInline.style.opacity = '1'
    })

    mainContainer.append(friendContainerInline)
    friendContainerInline.append(friendContainerFlex)
    friendContainerFlex.append(friendPhoto, friendInfo)

    return user
}

function onSubmitFunction(event) {
    if (showForm) {
        let emptyInputs = false
        
        if (inputForm[0].value + inputForm[1].value + inputForm[2].value + inputForm[3].value + inputForm[4].value === ''){
            emptyInputs = true
        }

        fullForm.style.opacity = '0'

        setTimeout(() => {
            fullForm.style.width = '0'
            fullForm.style.height = '0'
            fullForm.style.overflow = 'hidden'
            inputForm.forEach(el => {el.value = ''})
        }, 500)

        addFriend.classList.remove('button-doesnt-work')
        addFriend.classList.add('button-work')

        if(!emptyInputs) {
            let user = addFriendFunc(inputForm[0].value, inputForm[1].value, inputForm[2].value, inputForm[3].value, inputForm[4].value, photo)
            arrayWithFriends.push(user)
            let jsonStr = JSON.stringify(arrayWithFriends)
            localStorage.setItem('arrayWithFriends', jsonStr)
        }
        photo = ''
        showForm = false
    }
    event.preventDefault();
}