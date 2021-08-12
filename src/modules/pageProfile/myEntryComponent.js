import {useSelector} from "react-redux";
import {userEntry} from "../user/userSelectors";
import ADetail from "./aDetailComponent";

const mapToBadges = iter => iter.map(
    item => (
        <span className="badge badge-info mr-1 font-weight-normal" key={item}>{item}</span>
    )
)

const EntryExists = ({
                         entry: {
                             album_spotify_id, album_macrogenre, album_description, album_microgenre,
                             album_decade, album_adjectives, album_musical_elements, album_country,
                             artist_1_spotify_id, artist_2_spotify_id,
                             talkativity_preference, minds_talking, minds_not_talking,
                             adventurous, person_above_adventure,
                             triplet, match_macrogenre,
                             match_language, match_instrumental, match_description, match_microgenre,
                             match_adjectives, match_musical_elements, match_country, what_get_out
                         }
                     }) => (
    <div style={{fontSize: "1.1em"}}>
        <h6 className="mb-1 mt-3">Section 1 - Your album and how you describe it</h6>
        <div className="font-sans-serif font-italic p-2 border border-danger" style={{height: "100px"}}>Album will go here but for now the id is {album_spotify_id}</div>
        <ADetail name="Description" value={album_description} colBreakpoint="d-block" />
        <ADetail name="Adjectives" value={mapToBadges(album_adjectives)} colBreakpoint="d-block" />
        <ADetail name="Musical Elements" value={mapToBadges(album_musical_elements)} colBreakpoint="d-block" />
        <div className="row">
            <ADetail name="Macrogenre" value={album_macrogenre} />
            <ADetail name="Microgenre" value={album_microgenre} />
        </div>
        <div className="row">
            <ADetail name="Decade" value={album_decade} />
            <ADetail name="Country" value={album_country} />
        </div>

        <h6 className="mb-1 mt-3">Section 2 - Your recommended artists</h6>
        <div className="row">
            <div className="col-12 col-md-6">
                <div className="w-100 border border-danger font-sans-serif font-italic" style={{height: "100px"}}>
                    Artist 1 will go here but for now their id is {artist_1_spotify_id}
                </div>
            </div>
            <div className="col-12 col-md-6">
                <div className="w-100 border border-danger font-sans-serif font-italic" style={{height: "100px"}}>
                    Artist 2 will go here but for now their id is {artist_2_spotify_id}
                </div>
            </div>
        </div>

        <h6 className="mb-1 mt-3">Section 3 - What you want from your match</h6>
        <ADetail name="Description" value={match_description} colBreakpoint="d-block" />
        <ADetail name="Macrogenre" value={mapToBadges(match_macrogenre)} colBreakpoint="d-block" />
        <ADetail name="Microgenre" value={match_microgenre} colBreakpoint="d-block" />
        <ADetail name="Adjectives" value={mapToBadges(match_adjectives)} colBreakpoint="d-block" />
        <ADetail name="Musical Elements" value={mapToBadges(match_musical_elements)} colBreakpoint="d-block" />
        <ADetail name="Prefers talkativity" value={talkativity_preference} colBreakpoint="d-block"/>
        <div className="row">
            <ADetail name="Okay with talker?" value={minds_talking}/>
            <ADetail name="Okay with non-talker?" value={minds_not_talking}/>
        </div>
        <div className="row">
            <ADetail name="Adventurous Level" value={`${adventurous+3} / 5`}/>
            <ADetail name="Person over adventure?" value={`${person_above_adventure+3} / 5 Agree`}/>
        </div>
        <div className="row">
            <ADetail name="Okay with triplet?" value={triplet ? "Yes" : "No"}/>
            <ADetail name="Okay with instrumental?" value={match_instrumental ? "Yes" : "No"}/>
        </div>
        <div className="row">
            <ADetail name="Country" value={match_country}/>
            <ADetail name="Language" value={match_language}/>
        </div>
        <ADetail name="What do you want to get out of this?" value={what_get_out} colBreakpoint="d-block" />
    </div>
)

const MyEntry = () => {
    const entry = useSelector(userEntry);

    return (
        <div className="pp-dashed-border mt-3 p-2 bg-white w-100">
            <h5>
                <span className="mr-2">Your Matching Entry</span>
                {entry && <small className="font-sans-serif font-italic d-inline-block">
                    You cannot edit this information, you may only withdraw your entry and reapply.
                </small>}
            </h5>
            {entry ? (
                <EntryExists entry={entry}/>
            ) : (
                <p className="font-sans-serif">You do not have an entry.</p>
            )}
        </div>
    )
}

export default MyEntry;