import Rating from 'react-rating';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import Image from 'next/image';

export default function FUTCard(props) {
    const handleRatingSubmit = async (playerId, rating) => { 
        try {     
            await axios.post('http://localhost:8000/api/ratings/create/', {     
                rated: playerId,
                overall: rating,     
            }, {     
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,      
                },     
            });     
        } catch (error) {     
            console.error('Erro ao criar avaliação:', error);     
        }     
    };  

    return (  
        <div className="wrapper">
            <div className="fut-player-card">
                <div className="player-card-top">
                    <div className="player-master-info">
                        {/* TODO: implementar com que o rating só seja visto se o jogador já tiver pelo menos 5 avaliações e o usuário já o tenha avaliado */}
                        <div className="player-rating"><span>97</span></div> 
                        <div className="player-position"><span>RW</span></div>
                        <div className="player-nation"><img src="https://selimdoyranli.com/cdn/fut-player-card/img/argentina.svg" alt="Argentina" draggable="false" /></div>
                        <div className="player-club"><img src="https://selimdoyranli.com/cdn/fut-player-card/img/barcelona.svg" alt="Barcelona" draggable="false" /></div>
                    </div>
                    <div className="player-picture">
                        <Image 
                            src={props.picture ? props.picture : "/personsilhouette.png"} 
                            alt={props.picture ? props.name : "Jogador sem foto"} 
                            width={200} 
                            height={200}
                            style={{ objectFit: 'cover' }}
                            draggable="false" 
                        />
                    </div>
                </div>
                <div className="player-card-bottom">
                    <div className="player-info">
                        <div className="player-name"><span>{props.name}</span></div>
                        <div className="player-features">
                          
                        <Rating
                            fractions="2"
                            initialRating={props.initialRating}
                            size={128}
                            emptySymbol={<FaStar color="grey" />}
                            fullSymbol={<FaStar color="gold" />}
                            onChange={(rating) => handleRatingSubmit(props.idRated, rating)}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
