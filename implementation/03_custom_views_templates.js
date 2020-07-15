// In this file you can create your own custom view templates


// A view template is a function that returns a view,
// this functions gets some config (e.g. trial_data, name, etc.) information as input
// A view is an object, that has a name, CT (the counter of how many times this view occurred in the experiment),
// trials the maximum number of times this view is repeated
// and a render function, the render function gets CT and the magpie-object as input
// and has to call magpie.findNextView() eventually to proceed to the next view (or the next trial in this view),
// if it is an trial view it also makes sense to call magpie.trial_data.push(trial_data) to save the trial information



const mousetracking_view_template = function(config) {
    const view = {
        name: config.name,
        CT: 0,
        trails: config.trails,
        render: function (CT, config) {
            const d = data[CT];
            const categories = randomize_categories(d.correct_category, d.wrong_category);
            $('main').html(
                `<div class='magpie-view'>
                    <div class='magpie-view-stimulus-contaner'>
                        <div class='magpie-view-stimulus'>
                            <button class='left-category'>${categories[0]}</div>
                            <button class='right-category'>${categories[1]}</div>
                        </div>
                    </div>
                </div>`
            );
            
            $('.magpie-view').append(
                `<button id='click-me' class='magpie-view-button'>Click me!</button>`
            );

            $('#click-me').on('click', function(e) {
                $('#click-me').replaceWith(`<div>${d.animal_name}</div>`);
            });
        }
    };

    return view;
}


