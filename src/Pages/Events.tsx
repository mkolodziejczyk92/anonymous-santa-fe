import React, { useState, useEffect } from "react";
import Slider from "react-slick";

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

import pic1 from "../Assets/pic1.jpg";
import pic2 from "../Assets/pic2.jpg";
import pic3 from "../Assets/pic3.jpg";
import pic4 from "../Assets/pic4.jpg";
import pic5 from "../Assets/pic5.jpg";
import pic6 from "../Assets/pic6.jpg";
import pic7 from "../Assets/pic7.jpg";
import pic8 from "../Assets/pic8.jpg";


const GET_EVENTS_URL = "/event/user-events";
const ADD_EVENT_URL = "/event/add";
const DELETE_EVENT_URL = "/event/delete";
const JOIN_TO_EVENT_URL = "/event/join-to-the-event";
const DRAW_LOT_EVENT_URL = "/event/draw";
const GET_ALL_EVENT_PARTICIPANTS_URL = "/event/participants-by-event-id";

const eventImages = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8];

const Events: React.FC = () => {
  const { token } = useAuth();

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

  const deleteEventCallback = (id: string) => {
    try {
      const deleteEvent = async () => {
        await _delete(`${DELETE_EVENT_URL}/${id}`, token)
          .then((responseData: any) => {
            if (responseData) {
              const deleteEventsArray = events.filter(
                (event) => event.id !== id
              );

              setEvents(deleteEventsArray);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };

      deleteEvent();
    } catch (error: unknown) {
      console.log("error", error);
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
      <h1 style={{ display: "flex", justifyContent: "center" }}>Events</h1>
      <div className="EventsButtonContainer">
        <button className="EventsButton" onClick={addEventsButtonClicked}>
          AddEvent
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
                disabled={allCurrentParticipantsTakePartIn() ? false : true}
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
    </div>
  );
};

export default Events;
