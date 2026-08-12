import GrowWith from "./GrowWith/GrowWith";
import ExtendedTeam from "./MeetTeam/ExtendedTeam";
import MeetTeam from "./MeetTeam/MeetTeam";
import Mission from "./Mission/Mission";
import OurValues from "./OurValues/OurValues";
import WhatDifferent from "./WhatDifferent/WhatDifferent";
import TestimonialsAboutSection from "./TestimonialsAboutSection";

const AboutUsPage = () => {
    return (
        <div>
            <Mission />
            <WhatDifferent />
            <MeetTeam />
            <ExtendedTeam />
            <OurValues />
            <GrowWith />
            {/* <ClientSay /> */}
             <TestimonialsAboutSection />
        </div>
    );
};

export default AboutUsPage;