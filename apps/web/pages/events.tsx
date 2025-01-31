/* eslint-disable react-hooks/exhaustive-deps */
import { HomeLayout } from '@app/layout';
import { EventCard } from '@app/components/events';
import { NextPageWithLayout } from 'next';
import { useAllEvents } from '@app/hooks/api/Events';

const Events: NextPageWithLayout = () => {
    const { isLoading } = useAllEvents();

    if (isLoading) {
        <h1>loading</h1>;
    }

    return (
        <div className="p-6 flex flex-col ">
            <h1 className="text-center text-[48px]">Find Hackathons</h1>
            <div className="flex flex-wrap gap-[25px] justify-center lg:justify-start">
                <EventCard />
                <EventCard />
                <EventCard />
            </div>
        </div>
    );
};

Events.Layout = HomeLayout;
Events.RequireAuth = false;

export default Events;
