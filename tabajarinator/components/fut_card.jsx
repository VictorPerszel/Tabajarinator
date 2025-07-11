import { Rating } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import { FaBan, FaCheck } from 'react-icons/fa';
import Switch from '@mui/material/Switch';
import { FaStar } from 'react-icons/fa';

export default function FUTCard(props) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [hover, setHover] = useState(0);
    const [ratings, setRatings] = useState({
        pace: 0,
        shooting: 0,
        passing: 0,
        dribbling: 0,
        defending: 0
    });

    const labelsGoleiro = {
        0.5: 'Não consegue ver a bola',
        1: 'Desvia da bola',
        1.5: 'Desvia da bola',
        2: 'Se for nele, defende',
        2.5: 'Se for nele, defende',
        3: 'Sai na bola',
        3.5: 'Sai na bola',
        4: 'Pula',
        4.5: 'Pula no ângulo',
        5: 'Cortois'
    }

    const getLabelText = (value) => {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labelsGoleiro[value]}`;
    };

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

    const handleAttributeRating = (playerId, attribute, rating) => {
        // Only update local state immediately for better UX
        setRatings(prev => ({ ...prev, [attribute]: rating }));
        
        // Debounce the API call to avoid too many requests
        setTimeout(async () => {
            try {
                await axios.post('http://localhost:8000/api/ratings/create/', {
                    rated: playerId,
                    [attribute]: rating,
                }, {
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`,
                    },
                });
                console.log(`Rating submitted for ${attribute}: ${rating}`);
            } catch (error) {
                console.error('Erro ao criar avaliação de atributo:', error);
            }
        }, 500);
    };

    const handleFlip = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Flipping card, current state:', isFlipped);
        setIsFlipped(!isFlipped);
    };

    return (  
        <div className="wrapper">
            <div className={`fut-player-card ${isFlipped ? 'flipped' : ''}`}>
                <div className="card-front">
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
                                {props.initialRating ? (
                                    <span>Jogador avaliado <FaCheck style={{ color: 'green' }}/></span>
                                ) : (
                                    <span>Jogador não avaliado <FaBan style={{ color: 'red' }}/></span>
                                )}
                            </div>
                            <button 
                                type="button"
                                className="flip-button"
                                onClick={handleFlip}
                            >
                                Avaliar
                            </button>
                        </div>
                    </div>
                </div>

                <div className="card-back">
                    <div className="back-content">
                        <div className="back-header">
                            <Switch color="default" />
                        </div>
                        <div className="attributes-container">
                            <div className="attribute-row">
                                <span className="attribute-label">Hab. de Goleiro</span>
                                <Rating 
                                    name="pace-rating" 
                                    value={ratings.pace}
                                    precision={0.5} 
                                    onChange={(_event, newValue) => handleAttributeRating(props.idRated, 'pace', newValue)}
                                    onChangeActive={(_event, newValue) => setHover(newValue)}
                                    emptyIcon={<FaStar style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                            </div>
                            <div className="attribute-row">
                                <span className="attribute-label">Marcação</span>
                                <Rating 
                                    name="shooting-rating" 
                                    value={ratings.shooting}
                                    precision={0.5} 
                                    onChange={(_event, newValue) => handleAttributeRating(props.idRated, 'shooting', newValue)}
                                />
                            </div>
                            <div className="attribute-row">
                                <span className="attribute-label">Velocidade</span>
                                <Rating 
                                    name="passing-rating" 
                                    value={ratings.passing}
                                    precision={0.5} 
                                    onChange={(_event, newValue) => handleAttributeRating(props.idRated, 'passing', newValue)}
                                />
                            </div>
                            <div className="attribute-row">
                                <span className="attribute-label">Habilidade</span>
                                <Rating 
                                    name="dribbling-rating" 
                                    value={ratings.dribbling}
                                    precision={0.5} 
                                    onChange={(_event, newValue) => handleAttributeRating(props.idRated, 'dribbling', newValue)}
                                />
                            </div>
                            <div className="attribute-row">
                                <span className="attribute-label">Raça</span>
                                <Rating 
                                    name="defending-rating" 
                                    value={ratings.defending}
                                    precision={0.5} 
                                    onChange={(_event, newValue) => handleAttributeRating(props.idRated, 'defending', newValue)}
                                />
                            </div>
                        </div>
                        <p>{labelsGoleiro[hover] ? labelsGoleiro[hover] : 'Avaliação Detalhada'}</p>
                        <button 
                            type="button"
                            className="flip-button"
                            onClick={handleFlip}
                        >
                            Voltar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
