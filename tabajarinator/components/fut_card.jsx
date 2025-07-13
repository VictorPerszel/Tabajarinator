import { Rating } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import { FaBan, FaCheck } from 'react-icons/fa';
import Switch from '@mui/material/Switch';
import { MdStarOutline } from 'react-icons/md';
import GoleiroIcon from '../public/svg/goleiro.svg';
import MarcacaoIcon from '../public/svg/marcacao.svg';
import VelocidadeIcon from '../public/svg/velocidade.svg';
import HabilidadeIcon from '../public/svg/habilidade.svg';
import RacaIcon from '../public/svg/raca.svg';

export default function FUTCard(props) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isAdvancedOptions, setIsAdvancedOptions] = useState(false);
    const [hover, setHover] = useState(0);
    const [ratings, setRatings] = useState({
        overall: 0,
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

    const handleAttributeRating = (attribute, rating) => {
        // Only update local state immediately for better UX
        setRatings(prev => ({ ...prev, [attribute]: rating }));
        
        // Debounce the API call to avoid too many requests
        setTimeout(async () => {
            try {
                await axios.post('http://localhost:8000/api/ratings/create/', {
                    rated: props.idRated,
                    [attribute]: rating,
                }, {
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`,
                    },
                });
            } catch (error) {
                console.error('Erro ao criar avaliação de atributo:', error);
            }
        }, 500);
    };

    const handleFlip = (e) => {
        e.preventDefault();
        e.stopPropagation();
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
                                {/* {props.initialRating ? (
                                    <span>Jogador avaliado <FaCheck style={{ color: 'green' }}/></span>
                                ) : (
                                    <span>Jogador não avaliado <FaBan style={{ color: 'red' }}/></span>
                                )} */}
                                <div className="player-features-col">
                                    <img src="/svg/goleiro.svg" alt="Goleiro" className="attribute-icon" />
                                    <span>99</span>
                                </div>
                                <div className="player-features-col">
                                    <img src="/svg/marcacao.svg" alt="Marcação" className="attribute-icon" />
                                    <span>99</span>
                                </div>
                                <div className="player-features-col">
                                    <img src="/svg/velocidade.svg" alt="Velocidade" className="attribute-icon" />
                                    <span>99</span>
                                </div>
                                <div className="player-features-col">
                                    <img src="/svg/habilidade.svg" alt="Habilidade" className="attribute-icon" />
                                    <span>99</span>
                                </div>
                                <div className="player-features-col">
                                    <img src="/svg/raca.svg" alt="Raça" className="attribute-icon" />
                                    <span>99</span>
                                </div>
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
                            <div className="switch-container">
                                <span className="switch-label">Simples</span>
                                <Switch 
                                    color="default" 
                                    checked={isAdvancedOptions} 
                                    onChange={() => setIsAdvancedOptions(!isAdvancedOptions)} 
                                />
                                <span className="switch-label">Completa</span>
                            </div>
                        </div>
                        <div className="attributes-container">
                            {!isAdvancedOptions ? (
                                <div className="attribute-row centered-rating">
                                    <Rating 
                                        name="overall-rating" 
                                        value={ratings.overall || 0}
                                        precision={0.5} 
                                        onChange={(_event, newValue) => handleAttributeRating('overall', newValue)}
                                        onChangeActive={(_event, newValue) => setHover(newValue)}
                                        emptyIcon={<MdStarOutline style={{ opacity: 1, color: '#d4af37' }} fontSize="inherit" />}
                                        size="large"
                                    />
                                </div>
                            ) : (
                                <>
                                    <div className="attribute-row">
                                        <div className="attribute-label-container">
                                            <img src="/svg/goleiro.svg" alt="Goleiro" className="attribute-icon" />
                                            <span className="attribute-label">Goleiro</span>
                                        </div>
                                        <Rating 
                                            name="gk-rating" 
                                            value={ratings.gk}
                                            precision={0.5} 
                                            onChange={(_event, newValue) => handleAttributeRating('rating_gk', newValue)}
                                        />
                                    </div>
                                    <div className="attribute-row">
                                        <div className="attribute-label-container">
                                            <img src="/svg/marcacao.svg" alt="Marcação" className="attribute-icon" />
                                            <span className="attribute-label">Marcação</span>
                                        </div>
                                        <Rating 
                                            name="defense-rating" 
                                            value={ratings.defense}
                                            precision={0.5} 
                                            onChange={(_event, newValue) => handleAttributeRating('rating_defense', newValue)}
                                        />
                                    </div>
                                    <div className="attribute-row">
                                        <div className="attribute-label-container">
                                            <img src="/svg/velocidade.svg" alt="Velocidade" className="attribute-icon" />
                                            <span className="attribute-label">Velocidade</span>
                                        </div>
                                        <Rating 
                                            name="speed-rating" 
                                            value={ratings.speed}
                                            precision={0.5} 
                                            onChange={(_event, newValue) => handleAttributeRating('rating_speed', newValue)}
                                        />
                                    </div>
                                    <div className="attribute-row">
                                        <div className="attribute-label-container">
                                            <img src="/svg/habilidade.svg" alt="Habilidade" className="attribute-icon" />
                                            <span className="attribute-label">Habilidade</span>
                                        </div>
                                        <Rating 
                                            name="skill-rating" 
                                            value={ratings.skill}
                                            precision={0.5} 
                                            onChange={(_event, newValue) => handleAttributeRating('rating_skill', newValue)}
                                        />
                                    </div>
                                    <div className="attribute-row">
                                        <div className="attribute-label-container">
                                            <img src="/svg/raca.svg" alt="Raça" className="attribute-icon" />
                                            <span className="attribute-label">Raça</span>
                                        </div>
                                        <Rating 
                                            name="willpower-rating" 
                                            value={ratings.willpower}
                                            precision={0.5} 
                                            onChange={(_event, newValue) => handleAttributeRating('rating_willpower', newValue)}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                        <p>{labelsGoleiro[hover] ? labelsGoleiro[hover] : 'Clicar nos ícones reseta o voto'}</p>
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
