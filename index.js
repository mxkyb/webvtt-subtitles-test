let _trackInterval;

const initVideo = () => {
    const video = document.createElement('video');

    video.setAttribute('crossorigin', 'anonymous');

    video.addEventListener('error', (error) => {
        console.log(error);
    })

    return document.getElementById('app').appendChild(video);
};

const addSource = (video) => {
    const src = document.createElement('source');

    // src.setAttribute('src', 'https://dash.akamaized.net/akamai/test/caption_test/ElephantsDream/elephants_dream_480p_heaac5_1_https.mpd');
    src.setAttribute('src', '/elephants_dream.mpd');

    video.appendChild(src);
};

/**
 * This won't load any cues on 2022, regardles of using the external source or loading internally.
 */
const addTrack = (video) => {
    const track = document.createElement('track');
    track.setAttribute('default', '');

    track.kind = 'subtitles';
    track.label = 'English';
    track.srclang = 'en';
    track.src = 'https://dash.akamaized.net/akamai/test/caption_test/ElephantsDream/ElephantsDream_en.vtt';
    // track.src = '/subtitles.vtt';
    track.mode = 'showing';

    video.appendChild(track);
}

/**
 * this one will load cues in 2022, but also not display them.
 */
const loadDynamicLiveTracks = (video) => {
    const trackEn = video.addTextTrack('subtitles', 'English', 'en');

    trackEn.mode = 'showing';

    const enTracks = [
        'At the left we can see...',
        'At the right we can see the...',
        '...the head-snarlers.',
        'Everything is safe. Perfectly safe.',
        'Emo ? Emo!',
        'Watch out!',
        'Are you hurt?',
    ];

    let index = 0;

    clearInterval(_trackInterval);

    _trackInterval = setInterval(() => {
        if (!video.currentTime) {
            return;
        }

        trackEn.addCue(new VTTCue(
            video.currentTime + 1,
            video.currentTime + 2,
            enTracks[index % enTracks.length],
        ));

        index++;
    }, 1000);
};

const startVideo = () => {
    const video = initVideo();
    addSource(video);
    // addTrack(video);

    video.play();

    loadDynamicLiveTracks(video);

    console.log('play video');
}

initDebug();

document.getElementById('button').focus();
document.getElementById('button').addEventListener('keydown', () => {
    console.log('clicked button');

    startVideo();
});
