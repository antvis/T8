import { ComponentChildren, createContext } from 'preact';
import { useContext } from 'preact/compat';
import { NarrativeEvents } from '../../types';

type EventProviderProps = {
  events: NarrativeEvents;
  children: ComponentChildren;
};

export function EventProvider({ events, children }: EventProviderProps) {
  return <EventContext.Provider value={events}>{children}</EventContext.Provider>;
}

const EventContext = createContext<NarrativeEvents>({});

export function useEvent(): NarrativeEvents {
  const events = useContext(EventContext);
  return events;
}
