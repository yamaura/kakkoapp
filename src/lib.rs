use plotters::prelude::*;
use wasm_bindgen::prelude::*;

fn draw_impl(text: &str) -> Result<String, Box<dyn std::error::Error>> {
    // Create a 800*600 bitmap and start drawing
    let mut buf = "".to_string();
    let mut backend = SVGBackend::with_string(&mut buf, (800, 600));

    const W: i32 = 10;
    const H: i32 = 10;

    let mut i = 0;
    let mut j = 0;
    for c in text.chars() {
        let x = i * W;
        let y = j * H;
        backend.draw_rect(
            (x, y),
            (x + W, y + H),
            match c {
                '(' => &BLACK,
                ')' => &RED,
                _ => &WHITE,
            },
            true,
        )?;
        i += 1;
        if c == '\n' {
            i = 0;
            j += 1;
        };
    }
    backend.present()?;
    drop(backend);
    Ok(buf)
}

#[wasm_bindgen]
pub fn draw(s: &str) -> String {
    draw_impl(s).unwrap()
}
