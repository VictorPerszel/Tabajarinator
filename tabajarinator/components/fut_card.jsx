import Rating from 'react-rating';
import { FaStar } from 'react-icons/fa';

export default function FUTCard(props) {

    return (
        <>
        <div class="wrapper">
            <div class="fut-player-card">
                <div class="player-card-top">
                    <div class="player-master-info">
                        <div class="player-rating"><span>97</span></div>
                        <div class="player-position"><span>RW</span></div>
                        <div class="player-nation"><img src="https://selimdoyranli.com/cdn/fut-player-card/img/argentina.svg" alt="Argentina" draggable="false" /></div>
                        <div class="player-club"><img src="https://selimdoyranli.com/cdn/fut-player-card/img/barcelona.svg" alt="Barcelona" draggable="false" /></div>
                    </div>
                    <div class="player-picture"><img src="https://selimdoyranli.com/cdn/fut-player-card/img/messi.png" alt="Messi" draggable="false" />
                        <div class="player-extra"><span>4*SM</span><span>4*WF</span></div>
                    </div>
                </div>
                <div class="player-card-bottom">
                    <div class="player-info">
                        <div class="player-name"><span>{props.nome}</span></div>
                        <div class="player-features">
                          
                        <Rating
                            fractions="2"
                            initialRating={props.initialRating}
                            size={128}
                            emptySymbol={<FaStar color="grey" />}
                            fullSymbol={<FaStar color="gold" />}
                            onChange={(nota) => handleSubmit(props.initialRating, nota)}/>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </>
    )
}
