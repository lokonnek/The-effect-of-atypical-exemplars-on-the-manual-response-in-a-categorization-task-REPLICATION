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
        trials: config.trials,
        render: function (CT, magpie) {
            const d = config.data[CT];
            const categories = randomize_categories(d.correct_category, d.wrong_category);
            $('main').html(
                `<div class='magpie-view'>
                    <div class='magpie-view-stimulus-contaner'>
                        <div class='magpie-view-stimulus'>
                            <button id='left-category' class='category-answer'}>${categories[0]}</button>
                            <button id='right-category' class='category-answer'>${categories[1]}</button>
                        </div>
                    </div>
                </div>`
            );

            let mt_hack_interval;
            // Only do mousetracking if specified 
            if (config.mousetracking != undefined) {
                // Manually setup mousetracking. The documentation indicates that
                // this should work by default, but it seems to be tied into the
                // logic on the pre-defined views. We are unsure of how to integrate
                // our custom logic with that, while retaining full control of the
                // custom view.
                magpieMousetracking(config.mousetracking, d);

                // There's an inherent flaw in the mousetracking of magpie: It does
                // not allow the capture of mousemovement while the mouse is not
                // moving. We suppose that this could be extrapolated after the
                // fact, but instead we're just forcing the re-firing of the event
                // that mousetracking is listening to (mousemove). Of course, js
                // is not really built for any of this, so no solution is really
                // the best. It would seem, however, that the previous research had
                // a consistent 42hz, so we try to simulate that.
                let last_event;
                let event_obj;
                $('body').on('mousemove', (e) => {
                    event_obj = e;
                    last_event = new Date();
                });
                mt_hack_interval = setInterval(() => {
                    if (!last_event) return;
                    if ((new Date()).getTime() - last_event.getTime() > 1000/42) {
                        $('body').trigger(event_obj);
                    }
                }, 1000/42);
            }


            const handleCategoryClick = function(e) {
                const trial_data = {
                    trial_name: config.name,
                    trial_number: CT + 1,
                    answer: $(e.target).text(),
                    left_category: $('#left-category').text(),
                    right_category: $('#right-category').text(),
                    correct_category: d.correct_category,
                    animal: d.animal_name,
                    type: d.type,
                    mt_start: d.mousetrackingStartTime,
                    mt_times: d.mousetrackingTime.join(','),
                    mt_x: d.mousetrackingX.join(','),
                    mt_y: d.mousetrackingY.join(',')
                }

                if (mt_hack_interval) {
                    clearInterval(mt_hack_interval);
                }

                magpie.trial_data.push(trial_data);
                console.log(trial_data);
                
                magpie.findNextView();
            };

            const handleClickmeClick = function(e) {
                $('#click-me').replaceWith(`<div class='animal-name'>${d.animal_name}</div>`);
                $('.category-answer').on('click', handleCategoryClick);

                if (config.mousetracking != undefined) {
                    // Origin is at start of mouse position
                    const origin = {x: e.pageX, y: e.pageY};
                    config.data[CT].mousetracking.start(origin);
                }
            }
            
            // Create clicme button after 2000 ms.
            const delay = 2000;
            setTimeout(function() {
                $('.magpie-view').append(
                    `<button id='click-me' class='magpie-view-button'>Click me!</button>`
                )
                $('#click-me').on('click', handleClickmeClick);
            }, delay);
        }
    };

    return view;
}


