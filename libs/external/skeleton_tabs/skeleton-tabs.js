
$(function() {
    var animationClasses = 'tab-pane--exit-left tab-pane--exit-right tab-pane--enter-left tab-pane--enter-right';

    function finishTransition($content, $selectedPane) {
        window.clearTimeout($content.data('tabTransitionTimer'));
        $content.removeData('tabTransitionTimer').removeClass('is-transitioning');
        $content.children('.tab-pane')
            .off('animationend.tabSwitch')
            .removeClass(animationClasses + ' active');
        $selectedPane.addClass('active');
    }

    $('ul.tab-nav li .button').on('click', function() {
        var $button = $(this);
        var $tabNav = $button.closest('ul.tab-nav');
        var $selectedButton = $tabNav.find('li .button.active').first();

        if ($button.hasClass('active') || !$selectedButton.length) {
            return false;
        }

        if ($tabNav.hasClass('tab-nav--filter')) {
            var $filterContent = $tabNav.next('.tab-content--filter');
            if (!$filterContent.length) {
                return false;
            }

            window.clearTimeout($filterContent.data('tabFilterTimer'));
            $selectedButton.removeClass('active');
            $button.addClass('active');
            $filterContent.toggleClass('is-condensed', $button.attr('data-view') === 'selected');

            if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                $filterContent.removeClass('is-filter-animating');
            } else {
                $filterContent.addClass('is-filter-animating');
                $filterContent.data('tabFilterTimer', window.setTimeout(function() {
                    $filterContent.removeClass('is-filter-animating').removeData('tabFilterTimer');
                }, 520));
            }
            return false;
        }

        var $nextPane = $($button.attr('data-ref'));
        var $tabContent = $nextPane.parent('.tab-content');
        if (!$tabContent.length) {
            return false;
        }

        var $currentPane = $($selectedButton.attr('data-ref'));
        var movingRight = $button.closest('li').index() > $selectedButton.closest('li').index();

        // A second click completes the previous switch before starting the next one.
        finishTransition($tabContent, $currentPane);
        $selectedButton.removeClass('active');
        $button.addClass('active');

        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            finishTransition($tabContent, $nextPane);
            return false;
        }

        $tabContent.addClass('is-transitioning');
        $currentPane.addClass('active ' + (movingRight ? 'tab-pane--exit-left' : 'tab-pane--exit-right'));
        $nextPane.addClass('active ' + (movingRight ? 'tab-pane--enter-right' : 'tab-pane--enter-left'));

        $nextPane.on('animationend.tabSwitch', function(event) {
            if (event.target === this) {
                finishTransition($tabContent, $nextPane);
            }
        });

        // Also clean up if animationend is skipped (for example, a hidden tab).
        $tabContent.data('tabTransitionTimer', window.setTimeout(function() {
            finishTransition($tabContent, $nextPane);
        }, 680));

        return false;
    });
});
