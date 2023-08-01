<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>COLEGIO MARIANO VALLA</title>

        <!-- Fonts -->
        {{-- <link rel="preconnect" href="https://fonts.bunny.net"> --}}
        {{-- <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" /> --}}
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400&display=swap" rel="stylesheet">        <!-- Scripts -->
        <script defer="" src="https://kit.fontawesome.com/3450a829c3.js" crossorigin="anonymous"></script>
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx'])
        @inertiaHead
    </head>
    <script>
    //    const isAuthenticated = @json(Auth::check())
    </script>
    <body class="font-sans antialiased">
        @inertia

    </body>
</html>
