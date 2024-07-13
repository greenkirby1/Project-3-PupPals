# PupPals - Find Your Pup Some Pals 🐶
Want to find some play pals for your best pal? Look no further, this is the perfect app for it. 

This was my third project during the Software Engineering Immersive Course with General Assembly. It was a 3-people full-stack project that was completed in 2 weeks.

### Team Members
* Filomena Murgo
* Molly Gregson

<p align='center'>
  <img src='https://res.cloudinary.com/dv4ymisss/image/upload/v1720453273/ReadMe/puppals-sc_f11sbt.png'/>
</p>

## Deployment Link
Deployed on Heroku, please check it out [here](https://puppals-app-f588dbdb6cc0.herokuapp.com)

## Installation
* Fork and clone the repository
* Open project file in your preferred code editor
* From the project root folder, open an integrated terminal:
```
<!-- Split integrated terminal into 2 -->
<!-- Ensure this terminal is in root folder -->
npm install
npm run start <!-- Run command after ALL packages are installed -->

<!-- Navigate into the client folder for second -->
npm install
npm run dev <!-- Run command after ALL packages are installed -->

<!-- Check console for any errors and missing dependencies in package.json -->
<!- Navigate to http://localhost:4000/>
```

## Technologies Used
### Backend
* Node.js
* Express.js
* MongoDB
* Mongoose
### Front-End
* JavaScript
* React
* SCSS/SASS
* Downloads/Packages
  * [Axios](https://www.npmjs.com/package/axios)
  * [Bootstrap](https://www.npmjs.com/package/bootstrap)
  * [Cloudinary](https://www.npmjs.com/package/cloudinary)
  * [React Card Flip](https://www.npmjs.com/package/react-card-flip)
### Others
* Git
* GitHub
* Insomnia

## Brief
* Create a full-stack application with an Express API backend and a JavaScript React front-end
* Product must have multiple relationships between models and CRUD functionality
* Implement thorough user stories/wireframes and a visually impressive design
* Must be deployed online

## Planning
### Mood Board
<p align='center'>
  <img width='500' src='https://res.cloudinary.com/dv4ymisss/image/upload/v1720454457/ReadMe/puppals-moodboard_asffzq.png'/>
</p>

### Wireframes
<p align='center'>
  <img width='500' src='https://res.cloudinary.com/dv4ymisss/image/upload/v1720454459/ReadMe/puppals-page-wireframe_c5uy4s.png'/>
</p>

### Data Models and Relationships
<p align='center'>
  <img width='500' src='https://res.cloudinary.com/dv4ymisss/image/upload/v1720454457/ReadMe/puppals-flowchart_nmvq5m.png'/>
  <img width='500' src='https://res.cloudinary.com/dv4ymisss/image/upload/v1720454458/ReadMe/puppals-model_thpo9t.png'/>
</p>

## Build/Code Process
### Overview
We wanted to create an application that connects dog owners with other local dog owners. The idea was that the matching of owners would only be dependent on the dogs themselves and not the appearance of the owner, therefore users' information is not visible through the site unless it was given willingly themselves. We utilised a Trello board to brainstorm abd organise the planning process, as well as assigning tasks to members. 

Collectively we decided on having 5 pages in total: **Home Page**, **Register Page**, **Login Page**, **User Profile Page** and **Browsing Pups Page**. Only users who have an account and have added the information of their beloved pup can start matching with other pups. Once pups have matched with each other, they have the ability to send messages to each other or delete the chat log if they did not mesh well with the owner.

### Home Page
The page that first loads shows a hero image, with a nav bar containing links to the Registration or Login Page. Towards the bottom of the page, there are 2 containers that shows what **PupPals** is about and the pups that are looking for some pals!

### Registration / Log In Page
Both pages feature a reusable **form component** that handles different values and input types. It also returns any errors that arises. When the user successfully creates an account, the user will be navigated to the **Log In page** to log in. Once the log in form is completed, the user will be directed to the **User Profile Page**.

<p align='center'>
  <img width='200' src='https://res.cloudinary.com/dv4ymisss/image/upload/v1720720003/ReadMe/signup-puppals_qoove3.png'/>
  <img width='200' src='https://res.cloudinary.com/dv4ymisss/image/upload/v1720720003/ReadMe/login-puppals_ezfdkb.png'/>
</p>

### User Profile Page
The User Profile Page executes an axios request (requires authorization) on first render to retrieve the current user data, pup data created by the user and chat data. Each set of data is displayed in 3 separate containers, the profile and pup data can be updated using the **form component** and images that are upoloaded will be hosted on **Cloudinary**. Using a **React Callback** hook, whenever the data is updated the page component automatically re-renders to display the newest data. The chat container on the right hand side displays all matches, using the same Callback function it allows users to send and receive messages instantaneously. The option to delete a chat with another user removes the match from both parties.

<p align='center'>
  <img width='500' src='https://res.cloudinary.com/dv4ymisss/image/upload/v1720718795/ReadMe/user-profile-puppals_wa89fm.png'/>
</p>

### Browse Pups Page
Navigation to the browse pups page is only available to users who have logged in. On initial render the page makes an axios request to **GET** all pup data. Users who have created a pup will have the ability browse through other users' pups by clicking the arrow button and view the pups' information by clicking the open book button. When the user decides they like the pup they're viewing, they can **'throw a bone'** and hopefully it will be a successful match!

<p align='center'>
  <img width='500' src='https://res.cloudinary.com/dv4ymisss/image/upload/v1720720022/ReadMe/browse-pups-eg_huwmub.gif'/>
</p>

## What I Worked On
### Backend
My focal point in the backend was building the chat functionality. I built the chat model which consist of an array of messages (subdocument dictated by `messageSchema`), the 2 users that were matched and pups that matched. Initially, the pups field was added in case there's a need for users to add more than one pup. However the ability to add more than one was not implemented due to time restraints.

```js
const messageSchema = new mongoose.Schema({
  message: { type: String, required: true },
  pup: { type: mongoose.ObjectId, ref: 'Pup', required: true }
},
{ timestamps: { createdAt: true, updatedAt: false } }
)

const chatSchema = new mongoose.Schema({
  messages: [messageSchema],
  users: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    validate: {
      validator: function (arr) {
        return arr.length === 2
      },
      message: 'The users field must conatin 2 unique user IDs.'
    }
  },
  pups: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pup' }],
    validate: {
      validator: function (arr) {
        return arr.length === 2
      },
      message: 'The pups field must contain 2 unique pup IDs.'
    }
  }
},
{ timestamps: true }
)
```

The chat controllers all operated under secure routes, there are 3 functions in total to manage chat functionality. I created a function to retrieve all chats of the logged in user by populating the current user ID with `.populate('messages.pup', 'image')`:

```js
const chatIndex = async (req, res) => {
  try {
    const allChats = await Chat.find({ users: req.currentUser._id }).populate('messages.pup', 'image')
    if (!allChats) {
      return res.status(404).json({ message: 'Start chatting with your matches!' })
    }
    return res.json(allChats)
  } catch (error) {
    sendError(error, res)
  }
}
```

Sending messages once users have matched uses a **POST** method, where the current chat ID is set as a state variable by excecuting `findCurrentChat()` with an `onClick` function in front-end. `currentChat` is then included in the axios request when posting using the code below:

```js
// Front-End Function
const [currentChat, setCurrentChat] = useState()

function findCurrentChat(chatId) {
    const matchedChat = userChat.find(chat => chat._id === chatId)
    setCurrentChat(matchedChat)
  }

// Backend Function
const sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params
    const foundChat = await Chat.findById(chatId)
    if (!foundChat) {
      return res.status(404).json({ message: 'Sorry! Chat not found.' })
    }

    foundChat.messages.push(req.body)

    await foundChat.save()
    
    return res.json(foundChat)
  } catch (error) {
    sendError(error, res)
  }
}
```

In terms of deleting a match; which is done by deleting the chat, it uses the same state variable as posting a message to determine the correct chat that requires removal. In the code below, there's also verification to ensure the user deleting the chat is one of the users who owns it:

```js
const deleteMatch = async (req, res) => {
  try {
    const { chatId } = req.params
    const deleteChat = await Chat.findById(chatId)
    
    if (!deleteChat) {
      throw new Error.DocumentNotFoundError('Chat Not Found')
    }

    const matchedUser = deleteChat.users.find(user => user._id.equals(req.currentUser._id))

    if (!matchedUser) {
      return sendUnauthorized(res)
    }

    await deleteChat.deleteOne()

    res.sendStatus(204)
  } catch (error) {
    sendError(error, res)
  }
}
```

The creation of new chats only occurs when a match between pups happens. This action is done through users **'throwing a bone'**, which is essentially liking a pup profile. Whenever this action occurs the code simultaneously checks for the presence of the current user ID in other users' `bonesThrownBy` field, to ensure user can only like a profile once. It also checks whether the user ID of the pup profile you just liked is present in current user's `bonesThrownBy` field, if it is then a match is created. The code below executes this:

```js
const throwBones = async (req, res) => {
  try {
   
    const userId = req.params.userId;
    const targetProfile = await User.findById(userId)
    const matchedId = targetProfile.bonesThrownBy.find(id => {
      return id.equals(req.currentUser._id)
    })
    if (!matchedId) {
      
      targetProfile.bonesThrownBy.push(req.currentUser._id)
      await targetProfile.save();
    }
    
    const firstMatch = targetProfile.bonesThrownBy.find(id => {
      return id.equals(req.currentUser._id);
    });
    const secondMatch = req.currentUser.bonesThrownBy.find(id => {
      return id.equals(userId);
    })
    const currentUserPup = await Pup.findOne({ owner: req.currentUser._id })
    const targetUserPup = await Pup.findOne({ owner: targetProfile._id })
    console.log(currentUserPup, targetUserPup)


    if (!firstMatch || !secondMatch) {
      
      return res.json({ Message: 'No match' })
    }

    const chatData = {
      messages: [],
      users: [firstMatch, secondMatch],
      pups: [currentUserPup._id, targetUserPup._id]
    };

    const newChat = await Chat.create(chatData);



    return res.status(200).json({ targetProfile, newChat });
  } catch (error) {
    sendError(error, res)
  }
}
```

### Front-End
For the front-end, I was mainly responsible for the **User Profile Page**. I made sure the API end-points required for this page componenet retrieved the correct information by testing them with Insomnia. I also implemented the **React Card Flip** package across the site, and desgined the hero image in the **Home Page**.

## Reflections

### Challenges
This being our first full-stack project, personally I felt it was difficult to gauge how much we can get done within the timeframe we were given and we ended up planning too many features. It was also challenging sometimes when trying to figure out whether a code execution should occur in the backend or front-end, this resulted in having to go back and forth between front and back to correct the code. 

Writing the matching and chat feature was challenging, as they are dependent on each other. Initially, we were not sure whether the function to check for a match should be done in front-end or backend. This brought on a lot of confusion, but ultimately we worked out it should all be done through the users controller in backend.

I was also confused by how to properly utitlise the React Callback hook, which took awhile for me to figure out how to retrieve the updated data whenever a user changed their information.

### Wins
Our team worked very well together, we maintained a good flow of communication throughout the project using Slack. As well as using Trello to update the progress of our given tasks, which allowed us ensure there were no difficult merge conflicts or errors.

The plan we created was very well thought through with detailed concepts and features, we also included useful comments throughtout the code and it made the majority of the project easy to write. It was also easy for any group members to help out or take over a section of the code block if we were stuck.

A big win was definitely figuring out the matching feature, which took a long time to figure out!

### Key Takeaways
* Effective communication is necessary when working in a group
* Robustly testing out backend before moving on to the front, so that it causes less error in the future and if an error arises it'd be easier to spot
* A plan can never be too detailed

## Future Improvements
* Adding a map API to implement a map feature that show dog-friendly locations and parks 
* Allow users to filter other pups based on their locations
* Adding a review for the application, which allows others to view them in the Home Page to help potential users decide whether they want to join
* Ensure the application has a responsive desgin and allows users to view it on mobile