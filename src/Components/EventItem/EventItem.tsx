import { useAuth } from "../../Context/Auth/AuthContextPovider";
import "./EventItem.css";

export type EventItemPropsType = {
  id: string;
  name: string;
  date: string;
  peopleAmount: number;
  budget: number;
  currency: string;
  picture: string;
  participants?: EventItemParticipantsType[];
  organizerId?: string;
  deleteCallback?: (id: string) => void;
  openParticipantsCallback?: (id: string) => void;
};

export type EventItemParticipantsType = {
  participantName: string;
  participantSurname: string;
  participantEmail: string;
  takePartInInEvent?: boolean;
  eventPassword?: string;
  giftReceiver?: string;
  // event: EventDto;
  // user: UserDto;
};

const EventItem = ({
  id,
  name,
  date,
  peopleAmount,
  budget,
  currency,
  picture,
  deleteCallback,
  openParticipantsCallback,
  organizerId,
}: EventItemPropsType) => {
  const { token } = useAuth();

  const deleteEvent = () => {
    if (deleteCallback) {
      deleteCallback(id);
    }
  };
  const openParticipants = () => {
    if (openParticipantsCallback) {
      openParticipantsCallback(id);
    }
  };
  return (
    <li className="EventItem">
      <div className="EventItemPicture">
        {picture ? <img alt="eventPicture" src={picture} /> : <p>No picture</p>}
        <div className="EventItemButtonsContainer">
          <button
            className="EventsItemParticipantsButton"
            disabled={organizerId === token ? false : true}
            onClick={openParticipants}
          >
            Participants
          </button>
          <button
            className="EventsItemDeleteButton"
            disabled={organizerId === token ? false : true}
            onClick={deleteEvent}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="EventItemData">
        {name ? <h2>{name}</h2> : <p>No data</p>}
        <p>Date:</p>
        {date ? <span>{date}</span> : <span>No date data</span>}
        <p>People amount:</p>
        {peopleAmount && <span>{peopleAmount}</span>}
        <p>Budget:</p>
        {budget && currency && (
          <span>
            {budget} {currency}
          </span>
        )}
      </div>
    </li>
  );
};

export default EventItem;
