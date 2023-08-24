import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import image from "../Assets/Ev.png";

import JoinToEventForm, {
  JoinToEventFormDataType,
} from "../Components/Forms/JoinToEventForm";
import AddEventForm, {
  AddEventFormDataType,
  AddEventFormParticipantsDataType,
} from "../Components/Forms/AddEventForm";
import EventItem, {
  EventItemParticipantsType,
  EventItemPropsType,
} from "../Components/EventItem/EventItem";
import { EventDto, InvitationDto } from "../Dto/DtoProvider";
import axiosInstance, { post, _delete, get } from "../Api/axios";
import { useAuth } from "../Context/Auth/AuthContextPovider";
import { useNavigate } from "react-router-dom";

import pic1 from "../Assets/pic1.png";
import pic2 from "../Assets/pic2.png";
import pic3 from "../Assets/pic3.png";
import pic4 from "../Assets/pic4.png";
import pic5 from "../Assets/pic5.png";
import pic6 from "../Assets/pic6.png";
import pic7 from "../Assets/pic7.png";
import pic8 from "../Assets/pic8.png";


const GET_EVENTS_URL = "/event/user-events";
const ADD_EVENT_URL = "/event/add";
const DELETE_EVENT_URL = "/event/delete";
const JOIN_TO_EVENT_URL = "/event/join-to-the-event";
const DRAW_LOT_EVENT_URL = "/event/draw";
const GET_ALL_EVENT_PARTICIPANTS_URL = "/event/participants-by-event-id";

const eventImages = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8];

const Events: React.FC = () => {
  const { token } = useAuth();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const deleteEventCallback = (id: string) => {
    setOpenDeleteModal(true);
    setCurrentEventId(id);
  };

const closeDeleteModalWindow = () => {
    setOpenDeleteModal(false);
  };

  const navigate = useNavigate();

  const [addEventFormVisible, setAddEventFormVisible] =
    useState<boolean>(false);
  const [joinToEventFormVisible, setJoinToEventFormVisible] =
    useState<boolean>(false);
  const [openParticipantsModal, setOpenParticipantsModal] =
    useState<boolean>(false);

  const [events, setEvents] = useState<EventItemPropsType[]>([]);
  const [currentEventId, setCurrentEventId] = useState<string>("");

  //JOIN TO EVENT PART
  const joinToEventButtonClicked = () => {
    setJoinToEventFormVisible((prevState) => !prevState);
  };

  const sendJoinToEventButtonClicked = (data: JoinToEventFormDataType) => {
    const dataToSend: Map<string, string> = new Map();
    dataToSend.set("eventID", data.id);
    dataToSend.set("userEmail", data.email);
    dataToSend.set("eventPassword", data.password);
  
    try {
      const joinToEvent = async () => {
        const jsonData = Object.fromEntries(dataToSend);
        await post(`${JOIN_TO_EVENT_URL}`, JSON.stringify(jsonData), false, token)
          .then((responseData) => {
            if (responseData) {
              navigate("/");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };
      joinToEvent();
    } catch (error: unknown) {
      console.log("error", error);
    }
  };

  const closeJoinToEventButtonClicked = () => {
    setJoinToEventFormVisible((prevState) => !prevState);
  };

  //ADD EVENT PART
  const addEventsButtonClicked = () => {
    setAddEventFormVisible((prevState) => !prevState);
  };

  const sendAddEventButtonClicked = (data: AddEventFormDataType) => {
    const getParticipants = (
      participants: AddEventFormParticipantsDataType[]
    ): InvitationDto[] => {
      const participantMembers: InvitationDto[] = [];

      participants.forEach((participant) => {
        const participantMember: InvitationDto = {
          participantName: participant.participantName,
          participantSurname: participant.participantSurname,
          participantEmail: participant.participantEmail,
        };

        participantMembers.push(participantMember);
      });

      return participantMembers;
    };

    try {
      const dataToSend: EventDto = {
        budget: data.budget,
        currency: data.currency,
        eventDate: new Date(data.date),
        name: data.name,
        numberOfPeople: data.peopleAmount,
        organizerId: token,
        listOfInvitationForEvent: getParticipants(data.participants),
      };

      const addEvents = async () => {
        await post(`${ADD_EVENT_URL}`, dataToSend, false, token)
          .then((responseData) => {
            if (responseData) {
              navigate("/");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };

      addEvents();
    } catch (error: unknown) {
      console.log("error", error);
    }
  };

  const closeAddEventButtonClicked = () => {
    setAddEventFormVisible((prevState) => !prevState);
  };

  const deleteEvent = () => {
    try {
      const deleteEvent = async () => {
        await _delete(`${DELETE_EVENT_URL}/${currentEventId}`, token)
          .then((responseData: any) => {
            if (responseData) {
              const deleteEventsArray = events.filter(
                (event) => event.id !== currentEventId
              );
              setEvents(deleteEventsArray);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };

      deleteEvent();

      setOpenDeleteModal(false);
    } catch (error: unknown) {
      console.log("error", error);

      setOpenDeleteModal(false);
    }
  };

  const openParticipantsCallback =  async (id: string) => {
    setOpenParticipantsModal(true);

    if (id) {
      setCurrentEventId(id);
    }

    try {
      const responseData = await get(`${GET_ALL_EVENT_PARTICIPANTS_URL}/${id}`, token)
      if (responseData) {
        const participants: EventItemParticipantsType[] = responseData.map((participantData: any) => ({
          participantName: participantData.participantName,
          participantSurname: participantData.participantSurname,
          participantEmail: participantData.participantEmail,
          takePartInInEvent: participantData.participantStatus,
        }));
  
        setEvents((prevEvents) =>
          prevEvents.map((event) => {
            if (event.id === id) {
              event.participants = participants;
            }
            return event;
          })
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const drawLotsParticipants = () => {
    try {
      const drawLotsEvents = async () => {
        await post(
          `${DRAW_LOT_EVENT_URL}/${currentEventId}`,
          {},
          false,
          token
        )
          .then((responseData) => {
            if (responseData) {
              navigate("/");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };

      drawLotsEvents();
    } catch (error: unknown) {
      console.log("error", error);
    }
  };

  const closeParticipantsModalWindow = () => {
    setOpenParticipantsModal(false);
  };

  useEffect(() => {
    try {
      const getEvents = async () => {
        await get(`${GET_EVENTS_URL}`, token)
          .then((responseData: EventDto[]) => {
            if (responseData) {
              const eventItemData: EventItemPropsType[] = [];

              responseData.forEach((data) => {
                const eventItem: EventItemPropsType = {
                  id: (data.id as number).toFixed(),
                  budget: data.budget,
                  currency: data.currency,
                  date: new Date(data.eventDate).toLocaleDateString("en-GB"),
                  name: data.name,
                  peopleAmount: data.numberOfPeople,
                  picture: data.imageUrl + "",
                  organizerId: data.organizerId,
                  logInUserIsAnOrganizer: data.logInUserIsAnOrganizer,
                  giftReceiverForLogInUser: data.giftReceiverForLogInUser,
                  afterDraw: data.afterDraw,
                  deleteCallback: deleteEventCallback,
                  openParticipantsCallback: openParticipantsCallback,
                };

                eventItemData.push(eventItem);
              });

              setEvents(eventItemData);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };

      getEvents();
    } catch (error: unknown) {
      console.log("error", error);
    }
  }, []);

  const getFlickingItems = () => {
    return events.map((data) => {
      const {
        id,
        budget,
        currency,
        date,
        name,
        peopleAmount,
        picture,
        organizerId,
        logInUserIsAnOrganizer,
        giftReceiverForLogInUser,
        afterDraw,
      } = data;

      const imageNumber = parseInt(picture);

      const imageSrc = eventImages[imageNumber % eventImages.length];

      return (
        <EventItem
          id={id}
          key={id}
          budget={budget}
          currency={currency}
          date={date}
          name={name}
          peopleAmount={peopleAmount}
          picture={imageSrc}
          organizerId={organizerId}
          deleteCallback={deleteEventCallback}
          giftReceiverForLogInUser={giftReceiverForLogInUser}
          openParticipantsCallback={openParticipantsCallback}
          logInUserIsAnOrganizer={logInUserIsAnOrganizer}
          afterDraw={afterDraw}
        ></EventItem>
      );
    });
  };

  const getCurrentParticipants = () => {
    let participants: EventItemParticipantsType[] = [];

    events.map((eventItem) => {
      if (eventItem.id === currentEventId) {
        participants = eventItem.participants as EventItemParticipantsType[];
      }
    });

    return participants ?? [];
  };

  const getCurrentEventDrawInformation = () => {
    const eventItem = events.find((eventItem) => eventItem.id === currentEventId);

    if (eventItem) {
    const afterDrawValue = eventItem.afterDraw;
    return afterDrawValue;
    }
    return false;
  };

  const allCurrentParticipantsTakePartIn = () => {
    const currentParticipants = getCurrentParticipants();

    if (currentParticipants.length < 1) {
      return false;
    }

    const allTakePartIn = currentParticipants.every(
      (participant) => participant.takePartInInEvent === true
    );

    return allTakePartIn;
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: getFlickingItems().length > 2 ? 2 : getFlickingItems().length,
    slidesToScroll: 1,
  };

 return (
    <div className="Container">   
      <h1 style={{ display: "flex", justifyContent: "center" }}>
      <img src={image} alt="Events"/>
      </h1>
      <div className="EventsButtonContainer">
        <button className="EventsButton" onClick={addEventsButtonClicked}>
          Add event
        </button>
        <button className="EventsButton" onClick={joinToEventButtonClicked}>
          Join to event
        </button>
      </div>
      <div className="EventsSliderContainer">
        <Slider {...settings}>{getFlickingItems()}</Slider>
      </div>
      {joinToEventFormVisible && (
        <div className="EventsFormContainer">
          <JoinToEventForm
            formCallback={sendJoinToEventButtonClicked}
            closeForm={closeJoinToEventButtonClicked}
          ></JoinToEventForm>
        </div>
      )}
      {addEventFormVisible && (
        <div className="EventsFormContainer">
          <AddEventForm
            formCallback={sendAddEventButtonClicked}
            closeForm={closeAddEventButtonClicked}
          ></AddEventForm>
        </div>
      )}
      {openParticipantsModal && (
        <div className="EventsParticipantsModalWindow">
          <div className="EventsParticipantsModalContainer">
            <h1 className="EventsParticipantsModalTitle">Participants</h1>
            <div className="EventsParticipantsModalItemsContainer">
              {getCurrentParticipants().length ? (
                getCurrentParticipants().map((participant, index) => {
                  return (
                    <div
                      className="EventsParticipantsModalItemContainer"
                      key={index}
                    >
                      <input
                        readOnly
                        className="EventsParticipantsModalItemInput"
                        value={participant.participantName}
                      />
                      <input
                        readOnly
                        className="EventsParticipantsModalItemInput"
                        value={participant.participantSurname}
                      />
                      <input
                        readOnly
                        className="EventsParticipantsModalItemInput"
                        value={participant.participantEmail}
                      />
                      <button
                        className={
                          participant.takePartInInEvent
                            ? "EventsParticipantsModalItemTakePartInButton"
                            : "EventsParticipantsModalItemNotTakePartInButton"
                        }
                      ></button>
                    </div>
                  );
                })
              ) : (
                <h3>No data found!</h3>
              )}
            </div>
            <div className="EventsParticipantsModalButtonsContainer">
              <button
                className="EventsParticipantsModalDrawLotsButton"
                disabled={allCurrentParticipantsTakePartIn() && getCurrentEventDrawInformation() ? false : true}
                onClick={drawLotsParticipants}
              >
                Draw Lots!
              </button>
              <button
                className="EventsParticipantsModalCloseButton"
                onClick={closeParticipantsModalWindow}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {openDeleteModal && (
        <div className="EventsDeleteModalWindow">
          <div className="EventsDeleteModalContainer">
            <h3 className="EventsDeleteModalTitle">Confirm delete event</h3>
            <div className="EventsDeleteModalButtonsContainer">
              <button
                className="EventsDeleteModalDeleteButton"
                onClick={deleteEvent}
              >
                Delete
              </button>
              <button
                className="EventsDeleteModalCancelButton"
                onClick={closeDeleteModalWindow}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
 }
export default Events;
