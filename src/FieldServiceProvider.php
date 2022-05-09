<?php

namespace Stepanenko3\NovaMarkdown;

use Illuminate\Support\ServiceProvider;
use Laravel\Nova\Events\ServingNova;
use Laravel\Nova\Nova;

class FieldServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->publishes(
            [
                __DIR__.'/../config/nova-markdown.php' =>
                    config_path('nova-markdown.php'),
            ],
            'config'
        );

        Nova::serving(function (ServingNova $event) {
            Nova::script('nova-markdown', __DIR__.'/../dist/js/field.js');
        });

        $this->mergeConfigFrom(
            __DIR__.'/../config/nova-markdown.php',
            'nova-markdown'
        );
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
