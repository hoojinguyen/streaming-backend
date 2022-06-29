## Backend for the project video streaming

- One to One 
  + User online, fetch others status.
  + When they all online, UI updates and then they can click 'click', send their Session Description.
  + Receiver see comming call and accept it. Send back their Session Description to caller.
  + Both of them then send network candicatie information through Signaling channel (WS)

- One to many (broadcast)
  + All join to room, they can see all participant's status and broadcaster's status
  + Participant will updated only when the broadcast start the stream
  + Participant click some where (View Stream) to join the room.
  + Each pariticipant could be other's broadcaster.
  + Use both ws connection and ask client to check their broacaster status.
  + If after all, user couldn't receive the stream or couldn't find any broadcaster, Apply MCU for them.  




